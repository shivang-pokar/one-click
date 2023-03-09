import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Connection, ConnectionList, IntegrationData, messages } from '@one-click/data';
import { AlertService, CrudService, SocialConnectService } from '@one-click/one-click-services';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'one-click-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
})
export class ChannelsComponent implements OnInit {

  connectionList = ConnectionList;
  collName: string = 'integration';
  integrationList: IntegrationData;
  company_id = this.cookieService.get('company_id');
  constructor(
    private cookieService: CookieService,
    public socialConnectService: SocialConnectService,
    public crudService: CrudService,
    public alertService: AlertService,
  ) {
    
  }

  ngOnInit(): void {
    this.crudService.collection$(this.collName, (qry: any) => { return qry.where('company_id', '==', this.company_id) }).subscribe((resp: any) => {
      this.integrationList = resp[0];
      if (!this.integrationList) {
        this.integrationList = new IntegrationData();
        this.integrationList.company_id = this.company_id;
      }

      this.connectionList.forEach(connection => {
        connection.badge = this.integrationList?.integrationList.filter(integration => connection.id == integration.type).length;
      });



    })
  }

  socialConnect(event: Connection) {
    if (event.id == 'FACEBOOK') {
      this.facebookConnect();
    }
    if (event.id == 'INSTAGRAM') {
      this.connectInstagram();
    }
    if (event.id == 'TWITTER') {
      this.socialConnectService.twitterRedirectUrl();
    }
  }

  disconnect(event: any) { }

  /**
   * @facebookConnect using connect with Facebook Pages 
   * Adding type=FACEBOOK 
   * @addInIntegration Manage details
   */
  facebookConnect() {
    this.socialConnectService.authFacebook().then((resp: any) => {
      if (resp?.account?.length) {
        resp.account.forEach((account: any) => {
          account.type = "FACEBOOK";
          this.addInIntegration(account);
        });
        this.updateData();
      }
    })
  }

  /**
   * @connectInstagram using connect with Instagram Business 
   * Adding type=INSTAGRAM 
   * @addInIntegration Manage details
   */
  connectInstagram() {
    this.socialConnectService.authInstagram().then((resp: any) => {
      if (resp?.length) {
        resp.forEach((account: any) => {
          account.type = "INSTAGRAM";
          this.addInIntegration(account);
        })
        this.updateData();
      }
    });
  }

  /**
   * @account Account details
   * Add in integration list if already there update details
   */
  addInIntegration(account: any) {
    let index: number = this.integrationList.integrationList?.findIndex(integration => account.id == integration.id);
    if (index >= 0) {
      this.integrationList.integrationList[index] = account;
    } else {
      this.integrationList.integrationList.push(account);
    }
  }

  /**
   * @updateData Update Integration @Firestore
   */
  async updateData() {
    try {
      if (this.integrationList.id) {
        await this.crudService.update(this.collName, this.integrationList, this.integrationList.id)
      } else {
        await this.crudService.add(this.collName, this.integrationList)
      }
      this.alertService.success(messages.INT_DETAILS_UPDATED)
    }
    catch (e: any) {
      this.alertService.error(e.message)
    }
  }

}
