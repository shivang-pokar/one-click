import { Component, OnDestroy, OnInit } from '@angular/core';
import { Company, User, messages } from '@one-click/data';
import { AlertService, CommonServiceService, CrudService } from '@one-click/one-click-services';
import { CookieService } from 'ngx-cookie-service';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'one-click-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit, OnDestroy {

  uid = this.cookieService.get('uid');
  company_id = this.cookieService.get('company_id');
  destory$: Subject<void> = new Subject<void>();
  user: User;
  profileForm: FormGroup;
  isLoading: boolean = false;

  workspaceName: string;
  timeZone: string;
  timeZoneList: Array<string> = [];
  company: Company;

  constructor(
    public crudService: CrudService,
    private cookieService: CookieService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    public commonServiceService: CommonServiceService
  ) {

    this.profileForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(70), Validators.email, Validators.required])],
      company_id: ['', Validators.compose([Validators.required])],
      id: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      uid: ['', Validators.compose([Validators.required])],
      url: [''],
    });

    this.timeZoneList = this.commonServiceService.getTimeZoneList()

  }

  ngOnInit(): void {
    this.crudService.collection$('users', (qry: any) => { return qry.where('id', '==', this.uid) }).pipe(takeUntil(this.destory$)).subscribe(resp => {
      this.user = resp[0];
      this.profileForm.patchValue(this.user);
    });
    this.getCompany();
  }

  getCompany() {
    this.commonServiceService.company.subscribe(company => {
      if (company) {
        this.company = company;
        this.workspaceName = this.company.company_name;
        this.timeZone = this.company.timeZone;
      }
    });
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

  uploadFiles(event: any) {
    this.isLoading = true;
    this.crudService.fileUploadService(`${this.company_id}/profile`, event).then((resp: any) => {
      this.profileForm.get('url').setValue(resp[0].url);
      this.updateUser();
    }, er => {
      console.log(er);
      this.isLoading = false;
    })
  }

  async updateUser() {
    try {
      if (this.profileForm.valid) {
        await this.crudService.update('users', this.profileForm.value, this.profileForm.value.id);
        this.alertService.success(messages.DETAILS_UPDATED);
      } else {
        this.alertService.error(messages.REQUIRED);
        this.profileForm.markAllAsTouched();
      }
    }
    catch (e: any) {
      this.alertService.error(e.message);
    }
  }

  deletePhoto() {
    this.profileForm.get('url').setValue('');
    this.updateUser();
  }

  async saveCompany() {
    if (this.workspaceName && this.timeZone) {
      this.company.company_name = this.workspaceName;
      this.company.timeZone = this.timeZone;
      this.commonServiceService.updateCompnay(this.company)
      /* try {
        await this.crudService.update('company', this.company, this.company.id);
        this.alertService.success(messages.DETAILS_UPDATED)
      }
      catch (e: any) {
        this.alertService.error(e.message)
      } */
    } else {
      this.alertService.error(messages.NAME_TIMEZONE_REQUIRED);
    }
  }

}
