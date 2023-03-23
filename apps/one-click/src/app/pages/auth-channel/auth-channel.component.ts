import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IntegrationData, messages } from '@one-click/data';
import { AlertService, CommonServiceService, CrudService, SocialConnectService } from '@one-click/one-click-services';
import { CookieService } from 'ngx-cookie-service';
import { take } from 'rxjs';

@Component({
  selector: 'one-click-auth-channel',
  templateUrl: './auth-channel.component.html',
  styleUrls: ['./auth-channel.component.scss']
})
export class AuthChannelComponent implements OnInit {

  collName: string = 'integration';
  company_id = this.cookieService.get('company_id');
  integrationList: IntegrationData;

  constructor(
    public activatedRoute: ActivatedRoute,
    public socialConnectService: SocialConnectService,
    public router: Router,
    private cookieService: CookieService,
    public crudService: CrudService,
    public alertService: AlertService,
    public commonServiceService: CommonServiceService,
  ) {

  }

  ngOnInit(): void {

    let state = this.activatedRoute.snapshot.queryParams['state'];

    if (state == 'twitter') {
      let oauth_token = this.activatedRoute.snapshot.queryParams['oauth_token'];
      let oauth_verifier = this.activatedRoute.snapshot.queryParams['oauth_verifier'];
      this.connectWithTwitter(oauth_token, oauth_verifier)
    }

  }

  connectWithTwitter(oauth_token: string, oauth_verifier: string) {
    this.socialConnectService.getTwitterToken(oauth_token, oauth_verifier).subscribe(resp => {
      this.getIntegration().then(async () => {
        const userData: any = await this.socialConnectService.getTwitterUser(resp.access_token);
        resp.username = userData[0].username;
        resp.name = userData[0].name;
        resp.img = userData[0].profile_image_url;
        resp.created_at = userData[0].created_at;
        resp.protected = userData[0].protected;
        resp.verified = userData[0].verified;
        this.integrationList = this.commonServiceService.manageIntegrationList(this.integrationList, resp);
        this.updateData()
      });
    }, er => {
      this.alertService.error(er.message);
      this.router.navigateByUrl('/channels');
    })
  }


  getIntegration() {
    return new Promise((resolve, reject) => {
      this.crudService.collection$(this.collName, (qry: any) => { return qry.where('company_id', '==', this.company_id) }).pipe(take(1)).subscribe((integratipon: any) => {
        if (!integratipon[0]) {
          this.integrationList = new IntegrationData();
          this.integrationList.company_id = this.company_id;
        } else {
          this.integrationList = integratipon[0];
        }
        resolve(this.integrationList)
      })
    })
  }

  async updateData() {
    try {
      if (this.integrationList.id) {
        await this.crudService.update(this.collName, this.integrationList, this.integrationList.id)
      } else {
        await this.crudService.add(this.collName, this.integrationList)
      }
      this.router.navigateByUrl('/channels');
      this.alertService.success(messages.INT_DETAILS_UPDATED)
    }
    catch (e: any) {
      this.alertService.error(e.message)
    }
  }

}
