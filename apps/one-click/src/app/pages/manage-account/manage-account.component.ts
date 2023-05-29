import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IntegrationData, ConnectionList, Connection, messages } from '@one-click/data';
import { AlertService, CrudService } from '@one-click/one-click-services';
import { CookieService } from 'ngx-cookie-service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'one-click-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss', '../channels/channels.component.scss']
})
export class ManageAccountComponent implements OnInit, OnDestroy {

  collName: string = 'integration';
  integrationList: IntegrationData;
  company_id = this.cookieService.get('company_id');
  connectionList = ConnectionList;
  connectedConnectionList: Array<Connection> = [];
  destory$: Subject<void> = new Subject<void>();

  constructor(
    public crudService: CrudService,
    private cookieService: CookieService,
    private alertService: AlertService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.crudService.collection$(this.collName, (qry: any) => { return qry.where('company_id', '==', this.company_id) }).pipe(takeUntil(this.destory$)).subscribe((resp: any) => {
      this.integrationList = resp[0];
      this.connectedConnectionList = [];
      if (this.integrationList) {
        this.integrationList.integrationList.forEach(connection => {
          let index = this.connectionList.findIndex(item => item.id == connection.type)
          if (index >= 0) {
            let connectoin = JSON.parse(JSON.stringify(this.connectionList[index]));
            connectoin.connected = true;
            connectoin.socialDescription = connection.name;
            connectoin._id = connection.id;
            connectoin.badge = 0;
            this.connectedConnectionList.push(connectoin);
          }
        })
      }
    })
  }


  /**
   * Removing Connected account from list
   */
  disconnect(event: any) {
    this.alertService.confirmationDialog(messages.ARE_YOU_SURE).afterClosed().subscribe(resp => {
      if (resp) {
        this.integrationList.integrationList = this.integrationList.integrationList.filter(item => item.id != event._id);
        this.crudService.update(this.collName, this.integrationList, this.integrationList.id).then(resp => {
          this.alertService.success(messages.INT_REMOVED);
        }).catch(er => {
          this.alertService.error(er.message);
        })
      }
    })
  }


  ngOnDestroy(): void {
    this.destory$.next()
    this.destory$.complete()
  }

  addChannels() {
    this.router.navigateByUrl(`/channels`);
  }

}
