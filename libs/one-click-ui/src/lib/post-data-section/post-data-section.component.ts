import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Connection, ConnectionList, FileItem, IntegrationItem, PostContent } from '@one-click/data';
import { AlertService, CommonServiceService } from '@one-click/one-click-services';

@Component({
  selector: 'one-click-post-data-section',
  templateUrl: './post-data-section.component.html',
  styleUrls: ['./post-data-section.component.scss']
})
export class PostDataSectionComponent implements OnInit, OnChanges {

  @Input() selectedAccountList: Array<any> = [];
  maxCharecterLimite: number = 0;
  connectionList: Array<Connection> = ConnectionList;
  typedCharecter: number = 0;
  type: string = "ALL";
  connectionListSelected: Array<Connection> = [];
  postForm: FormGroup;
  @Output() postFormValues = new EventEmitter();
  @Input() singleAccount: IntegrationItem;
  @Input() noPersonalizedData: PostContent;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private commonServiceService: CommonServiceService,
  ) {

    this.postForm = this.formBuilder.group({
      message: [''],
      id: ['ALL'],
      type: ['ALL'],
      attachment: [''],
      attachment_type_list: [[]],
      attachment_valid: [true]
    });
  }

  ngOnInit(): void {

    if (this.singleAccount) {
      this.selectedAccountList = [this.singleAccount];
      this.type = this.singleAccount.type;
      this.postForm.get('id')?.setValue(this.singleAccount.id);
      this.postForm.get('type')?.setValue(this.type);
    }

    this.filterConnectionListSelected()

    this.charecterValidateion();
    this.postForm.valueChanges.subscribe(resp => {
      this.postFormValues.emit(this.postForm);
    })

    this.postForm.updateValueAndValidity({ onlySelf: false, emitEvent: true });

    if (this.noPersonalizedData) {
      this.noPersonalizedData.id = "ALL";
      this.postForm.patchValue(this.noPersonalizedData);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('selectedAccountList' in changes || 'singleAccount' in changes) {
      this.filterConnectionListSelected()
      this.charecterValidateion();
      this.validateImages();
    }
  }

  uploadSelectFile() {
    this.alertService.fileDialog().afterClosed().subscribe(resp => {
      this.setAttachment(resp, true);
    })
  }

  setAttachment(resp: Array<any>, is_new: boolean) {
    let attachment = [];
    if (is_new) {
      if (this.postForm.get('attachment')?.value) {
        attachment.push(...this.postForm.get('attachment')?.value)
      }
    }

    attachment.push(...resp);
    this.postForm.get('attachment')?.setValue(attachment);

    this.validateImages();


  }

  validateImages() {
    let attachment: Array<any> = this.postForm.get('attachment')?.value || [];
    let imageValidatorList = this.connectionListSelected.filter(connection => connection.imageRationMin > 0 && connection.imageRationMax > 0);
    this.postForm.get('attachment_valid')?.setValue(true);
    attachment.forEach(attach => {
      attach.is_valid = true;
      imageValidatorList.forEach(el => {
        let is_valid = this.commonServiceService.validateRationImage(attach.width, attach.height, el);
        if (!is_valid) {
          attach.is_valid = false;
          this.postForm.get('attachment_valid')?.setValue(false)
        }
      });
    });


    this.setAttachTypeList(attachment);


    this.postForm.get('attachment')?.setValue(attachment);
  }


  setAttachTypeList(attachment: Array<FileItem>) {
    let attachTypeList: Array<any> = [];
    attachment.forEach(element => {
      attachTypeList.push(element.type);
    })
    attachTypeList = [...new Set(attachTypeList)];
    this.postForm.get('attachment_type_list').setValue(attachTypeList);
  }


  charecterValidateion() {
    this.postForm.get('message')?.clearValidators();

    let charLimite: Array<number> = [];
    this.connectionListSelected.forEach(connection => {
      if (connection.connected && connection.charecterLimite > 0) {
        charLimite.push(connection.charecterLimite);
      }

      if (connection.attachRequired) {
        this.postForm.get('attachment')?.setValidators([Validators.required]);
        this.postForm.get('attachment')?.updateValueAndValidity();
      } else if (this.postForm.get('type')?.value != "ALL") {
        this.postForm.get('attachment')?.setValidators([]);
        this.postForm.get('attachment')?.updateValueAndValidity();
      }

    });

    if (charLimite.length) {
      this.maxCharecterLimite = Math.min(...charLimite);
    } else {
      this.maxCharecterLimite = 0;
    }

    if (this.maxCharecterLimite > 0) {
      this.postForm.get('message')?.setValidators([Validators.maxLength(this.maxCharecterLimite)]);
    }

    this.postForm.get('message')?.updateValueAndValidity();
  }

  postDescription() {
    this.typedCharecter = this.postForm.get('message')?.value?.length || "";
  }

  removeAttach(file: FileItem) {
    let attachment: Array<FileItem> = this.postForm.get('attachment')?.value;
    attachment = attachment.filter(item => item.id != file.id);
    this.setAttachment(attachment, false);
  }

  filterConnectionListSelected() {
    this.connectionListSelected = this.connectionList.filter(el => el.connected == true && (el.id == this.type || this.type == 'ALL'));
  }

  clearAll() {
    this.alertService.confirmationDialog('Are you sure you want to clear the post?').afterClosed().subscribe(resp => {
      if (resp) {
        this.postForm.get('message')?.reset();
        this.postForm.get('attachment')?.setValue([]);
        this.postForm.get('attachment_valid')?.setValue(true);
        this.postDescription();
      }
    })
  }

}
