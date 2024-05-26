import { Component, Input, OnInit } from '@angular/core';
import { taskRow } from '@one-click/one-click-services';

@Component({
  selector: 'one-click-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {

  @Input() task: any;
  @Input() isSubTask: boolean = false;
  taskRow = taskRow;
  constructor() {

  }

  ngOnInit(): void {

  }
}
