import { Component, Input, OnInit } from '@angular/core';
import { CommonServiceService } from '@one-click/one-click-services';

@Component({
  selector: 'one-click-assign-chip',
  templateUrl: './assign-chip.component.html',
  styleUrls: ['./assign-chip.component.scss'],
})
export class AssignChipComponent implements OnInit {

  @Input() teamListInTask: Array<any> = [];
  teamListMap: any = {};

  constructor(
    public commonServiceService: CommonServiceService
  ) {

  }

  ngOnInit(): void {
    this.teamListMap = this.commonServiceService.convertArrayToMapObj(this.commonServiceService.teamListData);
  }

}
