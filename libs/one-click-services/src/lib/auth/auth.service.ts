import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CookieService } from 'ngx-cookie-service';
import * as firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { User, messages } from '@one-click/data';
import { CrudService } from '../crud/crud.service';
import { AlertService } from '../alert/alert.service';
import { Observable, of, switchMap, take } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userCollection: string = 'users';
  firebase = firebase.default;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private cookieService: CookieService,
    private crudService: CrudService,
    private alertService: AlertService,
    public router: Router
  ) { }

  createUser(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(user.email as string, user?.password as string).then((res: any) => {
        let createUser: User = new User();
        firebase.default.auth().currentUser?.sendEmailVerification().then((() => {
          createUser.uid = res.user.uid;
          createUser.company_id = this.crudService.angularFirestore.createId();
          createUser.uid = res.user.uid;
          createUser.email = user.email;
          createUser.name = user.name;
          this.storeUserInFireStore(createUser).then(userResp => {
            resolve(createUser);
            let uid: string = createUser.uid || '';
            this.cookieService.set('uid', uid);
          }).catch(er => {
            resolve(er);
            this.alertService.error(er.message);
          });
        }))

      }).catch(error => {
        this.alertService.error(error.message);
        reject(error);
      });
    })
  }


  private storeUserInFireStore(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.crudService.authUser(user.company_id).subscribe();
      var userData: any = JSON.parse(JSON.stringify(user));
      this.crudService.add(this.userCollection, userData, userData.uid).then(usersRes => {
        this.alertService.success('Registration successfully completed');
        resolve(usersRes);
      }).catch(er => {
        this.alertService.error(er.message)
        reject(er);
      })
    });
  }

  async authUser(email: string, password: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const auth = await this.angularFireAuth.signInWithEmailAndPassword(email, password);
        this.crudService.collection$(this.userCollection, (qry: any) => qry.where('id', '==', auth.user?.uid)).pipe(take(1)).subscribe((resp: Array<User>) => {
          if (auth.user?.emailVerified) {
            let uid: any = resp[0].id;
            this.cookieService.set('uid', uid);
            this.cookieService.set('company_id', resp[0].company_id || "");
          }
          resolve(resp[0])
        }, er => {
          console.log(er)
        })

      }
      catch (e: any) {
        this.alertService.error(e.message)
        reject(e);
      }
    })
  }

  async getAuthStatus() {
    const auth = await this.angularFireAuth.currentUser;
    return auth;
  }

  async signOut() {
    this.alertService.confirmationDialog(messages.LOG_OUT).afterClosed().subscribe(async resp => {
      if (resp) {
        await this.angularFireAuth.signOut();
        this.cookieService.deleteAll();
        window.localStorage.clear();
        this.router.navigateByUrl('/login');
      }
    })
  }

  async resetPassword(email: string) {
    try {
      await this.angularFireAuth.sendPasswordResetEmail(email);
      this.alertService.success(messages.EMAIL_SEND);

    }
    catch (e: any) {
      this.alertService.error(e.message);
    }
    return;
  }

}
