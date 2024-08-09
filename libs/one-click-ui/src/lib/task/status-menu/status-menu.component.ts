import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonServiceService, StatusMenuService } from '@one-click/one-click-services';

@Component({
  selector: 'one-click-status-menu',
  templateUrl: './status-menu.component.html',
  styleUrls: ['./status-menu.component.scss']
})
export class StatusMenuComponent implements OnInit {

  @Output() selectedStatus = new EventEmitter()

  constructor(
    public statusMenuService: StatusMenuService,
    public commonServiceService: CommonServiceService
  ) {

  }

  ngOnInit(): void {

  }

  editDailog() {
    this.statusMenuService.openEditStatus();
  }

  selectStatus(label: any) {
    this.selectedStatus.emit(label)
  }

}
