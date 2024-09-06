import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonServiceService, GroupTaskService, taskRow } from '@one-click/one-click-services';
import EditorJS from '@editorjs/editorjs';

@Component({
  selector: 'one-click-task-edit-dialog',
  templateUrl: './task-edit-dialog.component.html',
  styleUrls: ['./task-edit-dialog.component.scss'],
})
export class TaskEditDialogComponent implements OnInit {

  taskRow = taskRow;
  taskRowMap: any = {};
  editor: EditorJS;

  constructor(
    public dialogRef: MatDialogRef<TaskEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public commonServiceService: CommonServiceService,
    public groupTaskService: GroupTaskService
  ) {

  }

  ngOnInit(): void {
    this.editor = this.commonServiceService.editorJS("What is this task about?");
    this.taskRowMap = this.commonServiceService.convertArrayToMapObj(this.taskRow)
  }

  assigneeList(event: any) {
    this.saveObject('assignee', event);
  }

  saveObject(key: string, value: any) {
    let object: any = { id: this.data.task.id, group_id: this.data.task.group_id };
    object[key] = value;
    this.groupTaskService.updateTaskDataOnly(object);
  }

  selectedStatus(event: any) {
    this.saveObject('status', event.id);
  }

  selectedPriority(event: any) {
    this.saveObject('priority', event.id);
  }

  saveSummery(event: any) {
    this.saveObject('summary', event);
  }

  labelsList(event: any) {
    this.saveObject('label', event);
  }

  blurDescription() {
    this.saveObject('taskName', this.data.task.taskName);
  }

  createComment() {
    console.log('Test')
  }

}
