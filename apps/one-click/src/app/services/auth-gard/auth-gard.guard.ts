import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService, CommonServiceService } from '@one-click/one-click-services';
import { map, Observable, take, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGardGuard implements CanActivate {

  constructor(
    public router: Router,
    public commonServiceService: CommonServiceService,
    private angularFireAuth: AngularFireAuth,
  ) {

  }

  canActivate(): any {
    return new Promise(async (resolve, reject) => {
      let user = await this.angularFireAuth.authState.pipe(take(1)).toPromise()
      if (user?.uid) {
        resolve(true)
      } else {
        this.router.navigateByUrl('/login');
        resolve(false)
      }
    });
  }

}
