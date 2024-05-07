import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivate, Router } from '@angular/router';
import { messages } from '@one-click/data';
import { AlertService, CommonServiceService } from '@one-click/one-click-services';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthSubscriptionService implements CanActivate {
  MIN_DAYS: number = 15;

  constructor(
    public router: Router,
    public commonServiceService: CommonServiceService,
    private angularFireAuth: AngularFireAuth,
    private alertService: AlertService,
  ) { }

  canActivate(): any {
    return new Promise(async (resolve, reject) => {
      let user = await this.angularFireAuth.authState.pipe(take(1)).toPromise()
      let company = await this.commonServiceService.getCompanyPromise();

      if (user?.uid && this.commonServiceService.diffTime(new Date().getTime(), company.stripe_expires_at) < 0) {
        resolve(true)
      } else {
        this.router.navigateByUrl('/settings');
        this.alertService.openDialog('Subscribe', messages.SUBSCRIBE_GPT)
      }
      resolve(false)
    });
  }
}
