import { Component, OnInit } from '@angular/core';
import { AuthService } from '@one-click/one-click-services';

@Component({
  selector: 'one-click-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss', '../login/login.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  isloading: boolean = false;
  email: string;

  constructor(
    public authService: AuthService
  ) {

  }

  ngOnInit(): void {

  }

  async resetPassword() {
    if (this.email) {
      this.isloading = true;
      this.authService.resetPassword(this.email);
      this.isloading = false;
      this.email = ""
    }
  }
}
