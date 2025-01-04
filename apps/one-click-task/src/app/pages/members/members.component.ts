import { Component } from '@angular/core';
import { AlertService } from '@one-click/one-click-services';

@Component({
  selector: 'one-click-members-page',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersPageComponent {
  displayedColumns: string[] = ['name', 'email', 'action'];
  dataSource: Array<any> = [];

  constructor(
    public alertService: AlertService
  ) {

  }

  inviteMemeber() {
    this.alertService.openInviteDailog();
  }

}
