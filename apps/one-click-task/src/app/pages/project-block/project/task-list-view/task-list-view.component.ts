import { Component, Input, OnInit } from '@angular/core';
import { Group } from '@one-click/data';
import { GroupTaskService, taskRow } from '@one-click/one-click-services';

@Component({
  selector: 'one-click-task-list-view',
  templateUrl: './task-list-view.component.html',
  styleUrls: ['./task-list-view.component.scss'],
})
export class TaskListViewComponent implements OnInit {

  @Input() group: Group;

  taskRow = taskRow;
  tasks: any[] = [];

  constructor(
    public groupTaskService: GroupTaskService
  ) {

  }

  ngOnInit(): void {

  }

  async openCloseGroup() {
    this.group = await this.groupTaskService.openCloseGroup(this.group);
  }

}
