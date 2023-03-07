import { Component, OnInit } from '@angular/core';
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
      console.log(this.integrationList)
    })
  }

  socialConnect(event: Connection) {
    if (event.id == 'FACEBOOK') {
      this.facebookConnect();
    }
  }

  disconnect(event: any) { }

  facebookConnect() {
    this.socialConnectService.authFacebook().then((resp: any) => {
      if (resp.account) {
        resp.account.forEach((element: any) => {
          element.type = "FACEBOOK";
        });
        this.integrationList.integrationList?.push(...resp.account)
        this.updateData();
      }
    })
  }

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
