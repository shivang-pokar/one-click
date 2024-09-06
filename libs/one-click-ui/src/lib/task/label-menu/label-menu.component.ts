import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonServiceService, StatusMenuService } from '@one-click/one-click-services';

@Component({
  selector: 'one-click-label-menu',
  templateUrl: './label-menu.component.html',
  styleUrls: ['./label-menu.component.scss'],
})
export class LabelMenuComponent implements OnInit {

  type = "label";
  @Input() labels: Array<any> = [];
  @Output() labelsList = new EventEmitter();

  labelsMap: any = {}

  constructor(
    public statusMenuService: StatusMenuService,
    public commonServiceService: CommonServiceService
  ) {

  }

  ngOnInit(): void {
    this.labels?.forEach(el => {
      this.setTeamMap(el, true)
    });
  }

  selectStatus(label: any) {
    if (this.labels.find(el => el == label.id)) {
      this.labels = this.labels.filter(el => el != label.id);
      this.setTeamMap(label.id, false)
    } else {
      this.labels.push(label.id);
      this.setTeamMap(label.id, true)
    }
    this.labelsList.emit(this.labels);
  }

  editDailog() {
    this.statusMenuService.openEditStatus(this.type);
  }

  setTeamMap(id: string, value: boolean) {
    this.labelsMap[id] = value;
  }

}
