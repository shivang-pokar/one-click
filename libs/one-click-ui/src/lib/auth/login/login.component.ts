import { Component, Input, OnInit } from '@angular/core';
import { AlertService, AuthService, CommonServiceService } from '@one-click/one-click-services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { messages } from '@one-click/data';
import * as firebase from 'firebase/compat/app';

@Component({
  selector: 'one-click-login-ui',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isloading: boolean = false;

  @Input() successUrl: string = "dashboard";

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private alertService: AlertService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(70), Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
  }

  async login() {
    if (this.loginForm.valid) {
      try {
        this.isloading = true;
        await this.authService.loginUser(this.loginForm.value, this.successUrl);
        this.isloading = false;
      }
      catch (e: any) {
        this.isloading = false;
        this.alertService.error(e.message);
      }
    }
  }
}
