import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Group } from '@one-click/data';
import { CommonServiceService, GroupTaskService, SocketService, taskRow } from '@one-click/one-click-services';

@Component({
  selector: 'one-click-task-list-view',
  templateUrl: './task-list-view.component.html',
  styleUrls: ['./task-list-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListViewComponent implements OnInit {

  @Input() group: Group;

  taskRow = taskRow;
  tasks: any[] = [];
  newAddedTaskId: string;

  constructor(
    public groupTaskService: GroupTaskService,
    public socketService: SocketService,
    public changeDetectorRef: ChangeDetectorRef,
    public commonServiceService: CommonServiceService
  ) {

  }

  ngOnInit(): void {
    this.getTaskBuGroup();
    this.socketService.joinGroup(this.group.id);
    this.setTaskInlist();
  }

  async openCloseGroup() {
    this.group = await this.groupTaskService.openCloseGroup(this.group);
  }

  async addNew() {
    let task = await this.groupTaskService.createTask(this.group.id);
    this.newAddedTaskId = task.id;
  }

  getTaskBuGroup() {
    this.groupTaskService.getTaskByGroup(this.group.id).subscribe(resp => {
      this.tasks = resp;
      this.changeDetectorRef.detectChanges();
    });
  }

  setTaskInlist() {
    this.socketService.onTodoTaskAdded(data => {
      if (this.group.id == data.group_id) {
        this.tasks = this.groupTaskService.getUpdateTaskList(this.tasks, data);
        this.tasks = this.commonServiceService.deepClose(this.tasks)
        this.changeDetectorRef.detectChanges();
      }
    })
  }

}
