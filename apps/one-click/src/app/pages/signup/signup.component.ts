import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { messages } from '@one-click/data';
import { AlertService, AuthService } from '@one-click/one-click-services';

@Component({
  selector: 'one-click-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../login/login.component.scss'],
})
export class SignupComponent {
  registerForm: FormGroup;
  isloading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private alertService: AlertService,
    private router: Router,
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['shivang.patel503@gmail.com', Validators.compose([Validators.maxLength(70), Validators.email, Validators.required])],
      password: ['this.admin', Validators.compose([Validators.required])],
      name: ['Shivang', Validators.compose([Validators.required])],
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
      this.authService.createUser(this.registerForm.value).then(res => {
        this.registerForm.reset();
        this.isloading = false;
        this.router.navigateByUrl('login');
        this.alertService.success(messages.VARIFICATION);
        //this.alertService.openDialog('Verification', messages.VARIFICATION)
      }).catch(er => {
        this.isloading = false;
      });
    }
  }
}
