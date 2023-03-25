import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@one-click/one-click-services';
import { map, Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGardGuard implements CanActivate {

  constructor(
    public router: Router,
    private angularFireAuth: AngularFireAuth,
  ) {

  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.angularFireAuth.authState.pipe(
      take(1),
      map(authState => {
        if (authState && authState.uid) {
          return true;
        }
        this.router.navigate(['login']);
        return false;
      })
    )
  }

}
