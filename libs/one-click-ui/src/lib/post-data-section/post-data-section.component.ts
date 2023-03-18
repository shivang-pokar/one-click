import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnectionList, FileItem } from '@one-click/data';
import { AlertService, CommonServiceService } from '@one-click/one-click-services';

@Component({
  selector: 'one-click-post-data-section',
  templateUrl: './post-data-section.component.html',
  styleUrls: ['./post-data-section.component.scss']
})
export class PostDataSectionComponent implements OnInit, OnChanges {

  personalized: boolean = false;
  @Input() selectedAccountList: Array<any> = [];
  maxCharecterLimite: number = 0;
  connectionList = ConnectionList;
  typedCharecter: number = 0;
  type: string = "ALL";
  connectionListSelected = this.connectionList.filter(el => el.connected == true && (el.id == this.type || this.type == 'ALL'));
  postForm: FormGroup;
  @Output() postFormValues = new EventEmitter();

  //isAttachValid: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private commonServiceService: CommonServiceService,
  ) {

    this.postForm = this.formBuilder.group({
      message: [''],
      id: ['ALL'],
      attachment: [''],
      attachment_valid: [true]
    });
  }

  ngOnInit(): void {

    this.charecterValidateion();
    this.postForm.valueChanges.subscribe(resp => {
      this.postFormValues.emit(this.postForm);
    })

    this.postForm.updateValueAndValidity({ onlySelf: false, emitEvent: true });


  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('selectedAccountList' in changes) {
      this.connectionListSelected = this.connectionList.filter(el => el.connected == true && (el.id == this.type || this.type == 'ALL'));
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

    this.postForm.get('attachment')?.setValue(attachment);
  }


  charecterValidateion() {
    this.postForm.get('message')?.clearValidators();

    let charLimite: Array<number> = [];
    this.connectionListSelected.forEach(connection => {
      if (connection.connected && connection.charecterLimite > 0) {
        charLimite.push(connection.charecterLimite);
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
    this.typedCharecter = this.postForm.get('message')?.value.length;
  }

  removeAttach(file: FileItem) {
    let attachment: Array<FileItem> = this.postForm.get('attachment')?.value;
    attachment = attachment.filter(item => item.id != file.id);
    this.setAttachment(attachment, false);
  }

}
