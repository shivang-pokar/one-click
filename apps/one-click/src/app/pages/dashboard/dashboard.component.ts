import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertService, CrudService } from '@one-click/one-click-services';
import { Connection, ConnectionList, IntegrationData, messages, PostContent } from '@one-click/data';
import { CookieService } from 'ngx-cookie-service';
import { Subject, takeUntil } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'one-click-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  integrationList: any[] = [];
  integration: IntegrationData;
  collName: string = 'integration';
  company_id = this.cookieService.get('company_id');
  destory$: Subject<void> = new Subject<void>();
  selectedAccountList: any[] = [];
  connectionList = ConnectionList;
  selectedType: string = "ALL";
  postForm: FormGroup;
  postContent: Array<PostContent> = [];

  constructor(
    public crudService: CrudService,
    public alertService: AlertService,
    private cookieService: CookieService,
  ) {

  }

  ngOnInit(): void {
    this.getIntegration();
  }

  getIntegration() {
    this.crudService.collection$(this.collName, (qry: any) => { return qry.where('company_id', '==', this.company_id) }).pipe(takeUntil(this.destory$)).subscribe((resp: Array<IntegrationData>) => {
      if (resp[0]) {
        this.selectedAccountList = [];
        resp[0].integrationList.forEach(account => {
          if (account.is_selected) {
            this.selectedAccountList.push(account);
          }
        });

        this.integration = resp[0];
        if (resp[0].integrationList) {
          this.integrationList = JSON.parse(JSON.stringify(resp[0].integrationList));
        }
        this.isConnectionConnected();
      }
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

  async selectedAccount(event: Array<any>) {
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

    if (this.postForm.get('id').value == 'ALL') {
      if (this.checkPostCondition) {
        let errors = this.postForm.get('message').errors;
        if (errors['maxlength']) {
          let message = messages.POST_REQUIRED_MAX_LENGTH
          message = message.replace('@number', errors['maxlength'].requiredLength);
          let index = this.connectionList.findIndex(connection => connection.charecterLimite == errors['maxlength'].requiredLength);
          message = message.replace('@social', this.connectionList[index].socialName);
          this.alertService.openDialog(messages.LIMITE_EXCE_TITLE, message);
        }
        else if (this.postForm.get('attachment_valid').value == false) {
          this.alertService.openDialog('Your Post is Empty', messages.IMG_RATION);
        }
        else {
          this.alertService.openDialog('Your Post is Empty', messages.POST_REQUIRED);
        }
      }
    }

  }

  get checkPostCondition() {
    return this.postForm.invalid || !this.postForm.get('message').value && !this.postForm.get('attachment').value || this.postForm.get('attachment_valid').value == false
  }

  postFormValues(event: FormGroup) {
    this.postForm = event;
    if (this.postForm.get('id').value == 'ALL') {
      this.postContent = [];
      this.integrationList.forEach(account => {
        if (account.is_selected) {
          let content: PostContent = new PostContent();
          content.id = this.crudService.angularFirestore.createId();
          content.content = this.postForm.get('message').value;
          content.attachment = this.postForm.get('attachment').value || [];
          account.postContent = content;
        }
      });
    }
  }



}
