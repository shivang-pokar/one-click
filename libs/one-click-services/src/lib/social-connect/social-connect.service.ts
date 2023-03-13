import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FacebookService, InitParams, LoginOptions, LoginResponse } from 'ngx-facebook';
import { map } from 'rxjs';
import { CrudService } from '../crud/crud.service';

const loginParams: LoginOptions = {
  auth_type: 'rerequest',
  /* pages_read_user_content,pages_manage_engagement,pages_read_engagement,pages_read_engagement,pages_manage_metadata */
  scope: 'public_profile,email,pages_show_list,pages_manage_posts',
  return_scopes: true,
}

const loginParamsInsta: LoginOptions = {
  auth_type: 'rerequest',
  /* pages_read_engagement,business_management,ads_management */
  scope: 'instagram_basic,pages_show_list,instagram_manage_insights,instagram_content_publish',
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

  /**
   * @authFacebook Connecting Facebook accounts
   * @return { login, account }
   * @account contains Account Token Information
   */
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

  /**
   * @authInstagram Connecting Instagram accounts
   * @return instagramList
   * @instagramList contains Account Token Information
   */
  async authInstagram() {
    try {
      const login: any = await this.fb.login(loginParamsInsta);
      const accounts = await this.getLifeLongAccessFacebook(login.authResponse.accessToken, login.authResponse.userID);
      let instagramList = [];
      for (let account of accounts) {
        const instagram: any = await this.getInstagramDetail(account.access_token, account.id);
        if (instagram.instagram_business_account) {
          login.authResponse.id = instagram.instagram_business_account.id;
          login.authResponse.access_token = account.access_token;
          login.authResponse.name = account.name;
          login.authResponse.img = `https://graph.facebook.com/${account.id}/picture?type=normal`
          delete login.authResponse.accessToken;
          instagramList.push(login.authResponse);
        }
      }
      return instagramList;
    }
    catch (e) {
      return e
    }
  }


  /**
   * Converting Token Limited time access into LifeTime Access
   */
  getLifeLongAccessFacebook(access_token: string, userID: any): Promise<any> {
    return new Promise((resolve, rejects) => {
      this.http.get(`${this.env.FB_AUTH_URL}/${userID}/accounts?access_token=${access_token}`).subscribe(async (resp: any) => {
        let connectedPages = []
        for (let page of resp.data) {
          let pageAccess: any = await this.http.post(`${this.env.API_BASE_URL}/auth/fb-life-long-token`, { access_token: page.access_token }).toPromise()
          page.access_token = pageAccess.access_token;
          page.img = `https://graph.facebook.com/${page.id}/picture?type=normal`;
          connectedPages.push(page);
        }
        resolve(connectedPages);
      }, er => {
        rejects(er)
      })
    })
  }

  /**
   * Get Instagram Account Details
   */
  getInstagramDetail(access_token: string, id: any) {
    return new Promise((resolve, rejects) => {
      this.http.post(`${this.env.API_BASE_URL}/auth/insagram-id`, { access_token: access_token, id: id }).subscribe((respLong: any) => {
        resolve(respLong);
      }, er => {
        rejects(er)
      });
    })

  }




  /**
  @Twitter Auth
  */
  twitterRedirectUrl() {
    this.getTwitterAuthUrl();
  }

  /**
  @TwitterAuthUrl
  */
  getTwitterAuthUrl() {
    this.http.get(this.env.API_BASE_URL + '/auth/twitter-authurl').subscribe((resp: any) => {
      window.location.href = `${resp.autlUrl}&state=twitter`;
    })
  }

  /**
   * @getTwitterToken
   * Twitter Account Information
   */
  getTwitterToken(oauth_token: string, oauth_verifier: string) {
    return this.http.post(this.env.API_BASE_URL + '/auth/twitter', { oauth_token: oauth_token, oauth_verifier: oauth_verifier }).pipe((map((action: any) => {
      action.id = action.user_id
      action.name = action.screen_name
      action.username = action.screen_name
      action.access_token = action.oauth_token
      delete action.oauth_token;
      action.type = 'TWITTER';
      action.date = new Date().getTime();
      return action;
    })));
  }

  /**
   * Genrate Access Token from Refresh Token
   * @returns AccessToken
   */
  genrateTwitterToken(refresh_token: string) {
    return new Promise((resolve, reject) => {
      this.http.post(this.env.API_BASE_URL + '/auth/twitter-genrate-token', { refresh_token: refresh_token }).subscribe(resp => {
        resolve(resp)
      }, er => {
        reject(er);
      })
    });
  }

  /**
   * @return Twitter User Details
   */
  getTwitterUser(access_token: string) {
    return new Promise((resolve, reject) => {
      this.http.post(this.env.API_BASE_URL + '/twitter/get-user', { "access_token": access_token }, {}).subscribe((userDetail: any) => {
        resolve(userDetail.data);
      }, er => {
        reject(er);
      })
    });
  }

}
