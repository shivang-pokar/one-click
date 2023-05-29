import { Component, OnInit } from '@angular/core';
import { AlertService, AuthService, CommonServiceService } from '@one-click/one-click-services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { messages } from '@one-click/data';
import * as firebase from 'firebase/compat/app';

@Component({
  selector: 'one-click-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isloading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private commonServiceService: CommonServiceService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['shivang.patel503@gmail.com', Validators.compose([Validators.maxLength(70), Validators.email, Validators.required])],
      password: ['this.admin', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
  }

  async login() {
    try {
      this.isloading = true;
      await this.authService.authUser(this.loginForm.value.email, this.loginForm.value.password);
      let authStatus = this.authService.getAuthStatus();
      authStatus.then(userAuth => {
        if (userAuth?.emailVerified) {
          this.router.navigateByUrl('dashboard');
          this.isloading = false;
          this.commonServiceService.logedInInitSubscribe();
        } else {
          firebase.default.auth().currentUser?.sendEmailVerification();
          this.alertService.error(messages.NOT_VERIFIED);
          this.isloading = false;
        }
      });
    }
    catch (e: any) {
      this.isloading = false;
      this.alertService.error(e.message);
      console.log(e)
    }
  }
}
