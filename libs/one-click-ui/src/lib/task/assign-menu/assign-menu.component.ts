import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '@one-click/data';
import { CommonServiceService } from '@one-click/one-click-services';

@Component({
  selector: 'one-click-assign-menu',
  templateUrl: './assign-menu.component.html',
  styleUrls: ['./assign-menu.component.scss'],
})
export class AssignMenuComponent implements OnInit {

  @Input() teamListInTask: Array<any> = [];
  teamList: Array<any> = [];
  teamListMap: any = {};

  @Output() assigneeList = new EventEmitter();

  constructor(
    public commonServiceService: CommonServiceService
  ) { }

  ngOnInit(): void {
    if (this.teamListInTask) {
      this.teamList = this.commonServiceService.deepClose(this.teamListInTask);
      this.teamList.forEach(el => {
        this.setTeamMap(el, true)
      })
    }
  }

  selectTeam(team: User) {
    if (this.teamList.find(el => el == team.id)) {
      this.teamList = this.teamList.filter(el => el != team.id);
      this.setTeamMap(team.id, false)
    } else {
      this.teamList.push(team.id);
      this.setTeamMap(team.id, true)
    }
    this.assigneeList.next(this.teamList);
  }

  setTeamMap(id: string, value: boolean) {
    this.teamListMap[id] = value;
  }

}
