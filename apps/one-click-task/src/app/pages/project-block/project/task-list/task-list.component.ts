import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Task } from '@one-click/data';
import { GroupTaskService, taskRow } from '@one-click/one-click-services';

@Component({
  selector: 'one-click-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit, OnChanges {

  @Input() task: Task;
  @Input() newAddedTaskId: string;
  @Input() isSubTask: boolean = false;
  taskRow = taskRow;
  showDescriptionInput: boolean = false;
  @ViewChild('myInput') myInput: ElementRef;

  contextMenuVisible = false;
  contextMenuPosition = { x: '0px', y: '0px' };

  @Output() removeNewAddedTaskId = new EventEmitter();


  constructor(
    public groupTaskService: GroupTaskService
  ) {

  }

  ngOnInit(): void {
    this.isNewTask();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['newAddedTaskId'].currentValue) {
      this.isNewTask();
    }
  }

  focusInput() {
    this.showDescriptionInput = true;
    setTimeout(() => {
      this.myInput.nativeElement.focus();
    }, 100);
  }

  blurDescription() {
    this.showDescriptionInput = false;
    this.saveObject('description', this.task.description);
    this.removeNewAddedTaskId.emit()
  }

  isNewTask() {
    if (this.newAddedTaskId == this.task.id) {
      this.focusInput();
      this.newAddedTaskId = null;
    }
  }

  onRightClick(event: MouseEvent) {
    event.preventDefault();
    this.contextMenuVisible = true;
    this.contextMenuPosition = {
      x: `${event.clientX}px`,
      y: `${event.clientY}px`
    };
  }

  @HostListener('document:click')
  hideContextMenu() {
    this.contextMenuVisible = false;
  }

  completeTask(event: any) {
    this.saveObject('completed', event.checked);
  }

  saveObject(key: string, value: any) {
    let object: any = { id: this.task.id, group_id: this.task.group_id };
    object[key] = value;
    this.groupTaskService.updateTaskDataOnly(object);
  }

  selectedStatus(event: any) {
    this.saveObject('status', event.id);
  }



}
