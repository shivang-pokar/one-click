import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Group } from '@one-click/data';
import { AlertService, CommonServiceService, GroupTaskService, SocketService, taskRow } from '@one-click/one-click-services';

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
  isEditing = false;
  @ViewChild('inputElement') inputElement: ElementRef<HTMLInputElement>;

  constructor(
    public groupTaskService: GroupTaskService,
    public socketService: SocketService,
    public changeDetectorRef: ChangeDetectorRef,
    public commonServiceService: CommonServiceService,
    public alertService: AlertService
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
        /* this.tasks = this.commonServiceService.deepClose(this.tasks); */
        this.changeDetectorRef.detectChanges();
      }
    })
  }

  toggleEdit() {
    this.isEditing = true;
    setTimeout(() => this.inputElement.nativeElement.focus(), 0);
  }

  saveGroup() {
    this.isEditing = false;
    this.groupTaskService.addUpdateGroup(this.group);
  }

}
