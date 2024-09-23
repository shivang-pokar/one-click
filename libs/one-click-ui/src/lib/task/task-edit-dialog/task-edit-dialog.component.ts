import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonServiceService, GroupTaskService, SocketService, taskRow } from '@one-click/one-click-services';
import EditorJS from '@editorjs/editorjs';
import { Comments } from '@one-click/data';
import { Router } from '@angular/router';

@Component({
  selector: 'one-click-task-edit-dialog',
  templateUrl: './task-edit-dialog.component.html',
  styleUrls: ['./task-edit-dialog.component.scss'],
})
export class TaskEditDialogComponent implements OnInit, OnDestroy {

  taskRow = taskRow;
  taskRowMap: any = {};
  editor: EditorJS;
  taskUrl: string = window.location.href;

  constructor(
    public dialogRef: MatDialogRef<TaskEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public commonServiceService: CommonServiceService,
    public groupTaskService: GroupTaskService,
    public socketService: SocketService,
    public router: Router
  ) {

  }

  ngOnInit(): void {
    this.editor = this.commonServiceService.editorJS("What is this task about?", this.data.task.description);
    this.taskRowMap = this.commonServiceService.convertArrayToMapObj(this.taskRow);
    this.triggerEventForEditor();
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


  ngOnDestroy(): void {

  }

  triggerEventForEditor() {
    const editorElement = document.getElementById('editor');
    editorElement.addEventListener('focusout', () => {
      this.editor.save().then(outputData => {
        this.saveObject('description', outputData);
      });
    })
  }

  taskDoneUnDone(checked: boolean) {
    this.saveObject('completed', checked);
  }

  async deleteTask() {
    let resp = await this.groupTaskService.deleteTask(this.data.task);
    if (resp) {
      this.dialogRef.close();
    }
  }

}
