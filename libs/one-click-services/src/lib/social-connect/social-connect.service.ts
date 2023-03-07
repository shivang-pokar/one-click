import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FacebookService, InitParams, LoginOptions, LoginResponse } from 'ngx-facebook';
import { CrudService } from '../crud/crud.service';

const loginParams: LoginOptions = {
  auth_type: 'rerequest',
  /* pages_read_user_content,pages_manage_engagement,pages_read_engagement,pages_read_engagement,pages_manage_metadata */
  scope: 'public_profile,email,pages_show_list,pages_manage_posts',
  return_scopes: true,
}


@Injectable({
  providedIn: 'root'
})
export class SocialConnectService {

  constructor(
    private fb: FacebookService,
    private crudService: CrudService,
    @Inject('env') public env: any,
    private http: HttpClient
  ) { }

  /**
  @Facebook Auth
  */
  initFacebook() {
    const initParams: InitParams = {
      appId: this.env.FB_APP_ID,
      xfbml: true,
      version: 'v13.0',
      cookie: true,
    };
    return this.fb.init(initParams);
  }

  async authFacebook() {
    try {
      let login: any = await this.fb.login(loginParams);
      login.authResponse.access_token = login.authResponse.accessToken
      delete login.authResponse.accessToken;
      const account = await this.getLifeLongAccessFacebook(login.authResponse.access_token, login.authResponse.userID);
      return { login, account }
    }
    catch (e) {
      return e
    }
  }

  getLifeLongAccessFacebook(access_token: string, userID: any): Promise<any> {
    return new Promise((resolve, rejects) => {
      this.http.get(`${this.env.FB_AUTH_URL}/${userID}/accounts?access_token=${access_token}`).subscribe(async (resp: any) => {
        let connectedPages = []
        for (let page of resp.data) {
          let pageAccess: any = await this.http.post(`${this.env.API_BASE_URL}/auth/fb-life-long-token`, { access_token: page.access_token }).toPromise()
          page.access_token = pageAccess.access_token;
          connectedPages.push(page);
        }
        resolve(connectedPages);
      }, er => {
        rejects(er)
      })
    })
  }

}
