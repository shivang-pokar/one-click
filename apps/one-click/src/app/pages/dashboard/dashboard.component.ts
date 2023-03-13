import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertService, CrudService } from '@one-click/one-click-services';
import { Connection, ConnectionList, IntegrationData, messages } from '@one-click/data';
import { CookieService } from 'ngx-cookie-service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'one-click-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  integrationList: any[] = [];
  integration: IntegrationData;
  collName: string = 'integration';
  company_id = this.cookieService.get('company_id');
  destory$: Subject<void> = new Subject<void>();
  selectedAccountList: any[] = [];
  connectionList = ConnectionList;
  selectedType: string = "ALL";

  constructor(
    public crudService: CrudService,
    public alertService: AlertService,
    private cookieService: CookieService,
  ) {

  }

  ngOnInit(): void {
    this.getIntegration();
  }

  getIntegration() {
    this.crudService.collection$(this.collName, (qry: any) => { return qry.where('company_id', '==', this.company_id) }).pipe(takeUntil(this.destory$)).subscribe((resp: Array<IntegrationData>) => {
      this.integration = resp[0];
      this.integrationList = resp[0].integrationList;
      this.isConnectionConnected();
    })
  }

  isConnectionConnected() {
    this.connectionList.forEach(item => {
      let index = this.integrationList.findIndex(element => element.type == item.id && element.is_selected == true);
      if (index >= 0) {
        item.connected = true;
      } else {
        item.connected = false;
      }
    })
  }

  async selectedAccount(event: Array<any>) {
    this.selectedAccountList = event;
    this.integration.integrationList.forEach(element => {
      let index = this.selectedAccountList.findIndex(integration => integration.id == element.id);
      if (index >= 0) {
        element.is_selected = true;
      } else {
        element.is_selected = false;
      }
    });
    try {
      await this.crudService.update(this.collName, this.integration, this.integration.id);
    }
    catch (e: any) {
      this.alertService.error(e.message);
    }
  }

  filterPreview(connection: Connection) {
    this.selectedType = connection.id;
  }



}
