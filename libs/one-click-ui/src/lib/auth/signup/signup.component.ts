import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company, User, messages } from '@one-click/data';
import { AlertService, AuthService, CommonServiceService, CrudService, labelList } from '@one-click/one-click-services';

@Component({
  selector: 'one-click-signup-ui',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../login/login.component.scss'],
})
export class SignupComponent {
  registerForm: FormGroup;
  isloading: boolean = false;
  @Input() successUrl: string = "dashboard";

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private alertService: AlertService,
    private crudService: CrudService,
    private router: Router,
    private commonServiceService: CommonServiceService,
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(70), Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
  }

  async signup() {
    if (this.registerForm.invalid) {
      this.alertService.error(messages.REQUIRED);
    }
    else {
      this.isloading = true;
      this.authService.createUser(this.registerForm.value).then(async (res: User) => {
        const company = new Company();
        company.company_name = res.name
        company.email = res.email
        company.id = res.company_id;
        company.labels = labelList;
        company.masterId = this.crudService.angularFirestore.createId();
        company.timeZone = this.commonServiceService.getTimeZone();
        await this.crudService.add(this.successUrl, company, company.id);
        this.registerForm.reset();
        this.isloading = false;
        this.router.navigateByUrl('login');
        this.alertService.success(messages.VARIFICATION);
      }).catch(er => {
        this.isloading = false;
      });
    }
  }
}
