import { Component, Input } from '@angular/core';
import { Task } from '@one-click/data';
import { GroupTaskService } from '@one-click/one-click-services';

@Component({
  selector: 'one-click-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
})
export class ContextMenuComponent {

  constructor(
    public groupTaskService: GroupTaskService
  ) {

  }

  @Input() task: Task;
  @Input() contextMenuPosition: any;

  delete() {
    this.groupTaskService.deleteTask(this.task);
  }

}
