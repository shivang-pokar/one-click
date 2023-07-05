import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AlertService, CrudService } from '@one-click/one-click-services';
import { Connection, ConnectionList, Integration, IntegrationItem, messages, PostContainer, PostContent } from '@one-click/data';
import { CookieService } from 'ngx-cookie-service';
import { Subject, takeUntil } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'one-click-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {

  integrationList: any[] = [];
  integration: Integration;
  collName: string = 'integration';
  company_id = this.cookieService.get('company_id');
  uid = this.cookieService.get('uid');
  destory$: Subject<void> = new Subject<void>();
  selectedAccountList: any[] = [];
  connectionList = ConnectionList;
  selectedType: string = "ALL";
  postForm: FormGroup;
  postContent: Array<PostContent> = [];
  postFormList: Array<FormGroup> = [];
  personalized: boolean = false;
  personalizedEv: boolean = false;
  noPersonalizedData: PostContent = new PostContent();
  isloading: boolean = false;


  @ViewChild('picker') picker: any;
  public minDate: Date = new Date();
  public color: ThemePalette = 'primary';
  scheduleDate: Date;
  reels: boolean = false;


  constructor(
    public crudService: CrudService,
    public alertService: AlertService,
    private cookieService: CookieService,
    public router: Router
  ) {

  }

  ngOnInit(): void {
    this.getIntegration();
  }

  getIntegration() {
    this.crudService.collection$(this.collName, (qry: any) => qry.where('company_id', '==', this.company_id)).pipe(takeUntil(this.destory$)).subscribe((resp: Array<Integration>) => {
      if (resp[0]) {
        this.selectedAccountList = [];
        resp[0]?.integrationList.forEach(account => {
          if (account.is_selected) {
            this.selectedAccountList.push(account);
          }
        });

        this.integration = resp[0];
        if (resp[0]?.integrationList) {
          this.integrationList = JSON.parse(JSON.stringify(resp[0].integrationList));
        }
        this.isConnectionConnected();
      }
    }, er => {
      console.log(er)
    })
  }

  isConnectionConnected() {
    this.connectionList.forEach(item => {
      let index = this.integrationList.findIndex(element => element.type == item.id && element.is_selected == true);
      if (index >= 0) {
        item.connected = true;
      } else {
        item.connected = false;
      }
    })
  }

  async selectedAccount(event: Array<IntegrationItem>) {
    this.selectedAccountList = event;
    this.integration.integrationList.forEach(element => {
      let index = this.selectedAccountList.findIndex(integration => integration.id == element.id);
      if (index >= 0) {
        element.is_selected = true;
      } else {
        element.is_selected = false;
      }
    });
    try {
      await this.crudService.update(this.collName, this.integration, this.integration.id);
    }
    catch (e: any) {
      this.alertService.error(e.message);
    }
  }

  filterPreview(connection: Connection) {
    this.selectedType = connection.id;
  }

  postNow() {
    for (let form of this.postFormList) {
      if (this.checkPostCondition(form)) {
        this.showErrorAlert(form);
        return;
      }
    }

    if (this.scheduleDate) {
      this.savePost('SCHEDULE')
    } else {
      let postContent: Array<PostContent> = this.createPostObj();
      if (postContent.length) {
        this.isloading = true;
        let obj = {
          company_id: this.company_id,
          uid: this.uid,
          postContent: postContent
        }
        this.crudService.createPost(obj).subscribe((resp: any) => {
          this.alertService.success(resp.message);
          //this.setPostData(postContent, 'SUCESS', resp.post);
          this.formReset();
          this.isloading = false;
        }, er => {
          this.isloading = false;
          this.alertService.error(er.message);
        })
      }
    }


  }

  async setPostData(postContent: Array<PostContent>, status: string, postResp: Array<any>) {
    const postContainer = new PostContainer();
    postContainer.id = this.crudService.angularFirestore.createId();
    postContainer.company_id = this.company_id;
    postContainer.status = status;

    postResp.forEach(post => {
      const index = postContent.findIndex(element => element.type == post.type);
      if (index >= 0) {
        postContent[index].post_id = post?.data?.id;
        postContent[index].creation_id = post?.data?.creation_id;

      }
    });


    postContainer.postContent = postContent;
    await this.crudService.add('postContainer', postContainer);
    return postContainer;
    //this.crudService.setRealTimeData(`postContainer/${postContainer.id}`, postContainer);
  }

  formReset() {
    for (const form of this.postFormList) {
      const value = form.value;
      form.reset({
        id: value.id,
        type: value.type,
        attachment_valid: true,
      })
    }
    this.noPersonalizedData = new PostContent();
  }

  createPostObj(): Array<PostContent> {
    const postData: Array<PostContent> = [];
    this.integrationList.forEach(account => {
      if (account.is_selected) {
        account.postContent.user_id = account.id;
        account.postContent.access_token = account.access_token;
        let index = this.connectionList.findIndex(connection => connection.id == account.type);
        if (this.connectionList[index].shortVideo && this.reels) {
          account.postContent.postType = "REELS";
        } else {
          account.postContent.postType = "POST";
        }

        if (account.oauth_token_secret) {
          account.postContent['oauth_token_secret'] = account.oauth_token_secret;
        }
        postData.push(account.postContent);
      }
    });
    return postData;
  }

  showErrorAlert(form: FormGroup) {

    const errors = form.get('message').errors;
    const attachmentErrors = form.get('attachment')?.errors;
    let index = this.connectionList.findIndex(connection => connection.id == form.get('type').value);


    const attachment_type_list = form.get('attachment_type_list')?.value

    if (errors && errors['maxlength']) {
      let message = messages.POST_REQUIRED_MAX_LENGTH;
      message = message.replace('@number', errors['maxlength'].requiredLength);
      const index = this.connectionList.findIndex(connection => connection.charecterLimite == errors['maxlength'].requiredLength);
      message = message.replace('@social', this.connectionList[index].socialName);
      this.alertService.openDialog(messages.LIMITE_EXCE_TITLE, message);
    }
    else if (attachmentErrors && attachmentErrors['required']) {
      const index = this.connectionList.findIndex(connection => connection.connected && connection.attachRequired == true);
      let message = messages.ATTACH_REQUIRED;
      message = message.replace('@social', this.connectionList[index].socialName);
      this.alertService.openDialog(messages.ATTACH_REQUIRED_TITLE, message);
    }
    else if (form.get('attachment_valid').value == false) {
      this.alertService.openDialog('Image aspect ratio', messages.IMG_RATION);
    }
    else if (attachment_type_list && attachment_type_list[0] == "VIDEO" && form.get('attachment').value?.length > this.connectionList[index].videoLimite) {
      this.alertService.openDialog(messages.VIDEO_LIMITE_TITLE, messages.VIDEO_LIMITE);
    }
    else if (index >= 0 && form.get('attachment_type_list')?.value?.length == 2) {
      this.alertService.openDialog(messages.BOTH_CANT_TITLE, messages.BOTH_CANT);
    }
    else {
      this.alertService.openDialog('Your Post is Empty', messages.POST_REQUIRED);
    }
  }

  checkPostCondition(form: FormGroup) {
    return form.invalid
      || (!form.get('message').value && (!form.get('attachment').value || !form.get('attachment').value?.length))
      || form.get('attachment_valid').value == false
      || form.get('attachment_type_list')?.value?.length == 2
      || form.get('attachment_type_list')?.value[0] == "VIDEO" && form.get('attachment').value?.length > 1;
  }

  postFormValues(event: FormGroup) {

    if (event.value.id == "ALL") {
      this.noPersonalizedData = event.value;
    }

    let index = this.postFormList.findIndex(form => form.value.id == event.value.id);

    if (index == -1) {
      this.postFormList.push(event);
    } else {
      this.postFormList[index] = event;
    }

    if (!this.personalized) {
      this.integrationList.forEach(account => {
        if (account.is_selected) {
          let content: PostContent = new PostContent();
          content.id = this.crudService.angularFirestore.createId();
          content.message = event.value?.message;
          content.type = account.type;
          content.attachment = event.value?.attachment || [];
          account.postContent = content;
        }
      });
    } else {
      this.postFormList.forEach(form => {
        let integrationIndex = this.integrationList.findIndex(integration => integration.id == form.value.id);
        if (integrationIndex >= 0) {
          let content: PostContent = new PostContent();
          content.id = this.crudService.angularFirestore.createId();
          content.type = this.integrationList[integrationIndex].type;
          content.message = form.get('message').value;
          content.attachment = form.get('attachment').value || [];
          this.integrationList[integrationIndex].postContent = JSON.parse(JSON.stringify(content));
        }
      });
    }
  }

  putPersonalizedData(event: any) {
    if (event.checked) {
      this.personalized = event.checked;
      this.personalizedEv = event.checked;
      setTimeout(() => {
        this.postFormList = this.postFormList.filter(form => form.value.id != 'ALL');
        this.postFormList.forEach(form => {
          if (form.value.id != 'ALL') {
            form.get('message').setValue(this.noPersonalizedData.message);
            form.get('attachment').setValue(this.noPersonalizedData.attachment);
          }
        })
      }, 150)
    } else {
      this.alertService.confirmationDialog('Customized posts for each account will be lost').afterClosed().subscribe(resp => {
        if (resp) {
          this.personalized = false;
          this.personalizedEv = false;
          this.postFormList = this.postFormList.filter(form => form.value.type != "ALL");
        } else {
          this.personalized = true;
          this.personalizedEv = true;
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.destory$.next()
    this.destory$.complete()
  }

  async savePost(status: string) {
    let postContent: Array<PostContent> = this.createPostObj();
    try {
      const setPostData = await this.setPostData(postContent, status, []);
      let message = "";
      if (status == "DRAFT") {
        message = messages.DRAFT_SAVE;
      }
      if (status == "SCHEDULE") {
        this.setSchdule(setPostData);
      }
      this.alertService.success(message);
    }
    catch (e: any) {
      this.alertService.error(e.message);
    }

    this.formReset();
  }

  setSchdule(setPostData: PostContainer) {
    this.crudService.createSchedule({
      time: this.scheduleDate,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      id: setPostData.id
    }).subscribe(() => {
      this.scheduleDate = null;
      this.alertService.success(messages.SCHEDULE_SAVE);
    })
  }

  addChannels() {
    this.router.navigateByUrl(`/channels`);
  }

}
