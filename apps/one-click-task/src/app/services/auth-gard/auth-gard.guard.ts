import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivate, Router } from '@angular/router';
import { CommonServiceService } from '@one-click/one-click-services';
import { CookieService } from 'ngx-cookie-service';
import { take } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGardGuard implements CanActivate {

  constructor(
    public router: Router,
    private cookieService: CookieService,
    public commonServiceService: CommonServiceService,
    private angularFireAuth: AngularFireAuth,
  ) {

  }

  canActivate(): any {
    return new Promise(async (resolve, reject) => {
      let company_id = this.cookieService.get('company_id');
      let user = await this.angularFireAuth.authState.pipe(take(1)).toPromise();
      if (user?.uid && company_id) {
        resolve(true)
      } else {
        this.router.navigateByUrl('/login');
        resolve(false)
      }
    });
  }

}
