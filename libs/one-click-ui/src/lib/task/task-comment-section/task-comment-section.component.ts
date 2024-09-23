import { Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Comments } from '@one-click/data';
import { CommonServiceService, GroupTaskService, SocketService } from '@one-click/one-click-services';

@Component({
  selector: 'one-click-task-comment-section',
  templateUrl: './task-comment-section.component.html',
  styleUrls: ['./task-comment-section.component.scss'],
})
export class TaskCommentSectionComponent implements OnInit, OnDestroy {

  @Input() task_id: string;
  commentList: Array<Comments> = [];
  teamListDataMap: any = {};
  @ViewChild('commentInput') commentInput: ElementRef;

  constructor(
    public groupTaskService: GroupTaskService,
    public socketService: SocketService,
    public commonServiceService: CommonServiceService
  ) {

  }

  ngOnInit(): void {
    this.socketService.joinComments(this.task_id);
    this.teamListDataMap = this.commonServiceService.convertArrayToMapObj(this.commonServiceService.teamListData);
    
    this.getCommentsForTask();
  }

  createComment(comment: any) {
    this.groupTaskService.createComment(this.task_id, comment.value);
    comment.value = "";
  }

  getCommentsForTask() {
    this.groupTaskService.getCommentsForTask(this.task_id).subscribe(resp => {
      this.commentList = resp;
    })

    this.socketService.onTodoCommentsAdded(data => {
      if (data.deleteFlag == "N" && data.task_id == this.task_id) {
        let index = this.commentList.findIndex(el => el.id == data.id);
        if (index > -1) {
          this.commentList[index] = data;
        } else {
          this.commentList.push(data);
        }
      } else if (data.deleteFlag == "Y") {
        this.commentList = this.commentList.filter(el => el.deleteFlag != "Y");
      }
    });

  }

  ngOnDestroy(): void {
    this.socketService.leaveComments(this.task_id);
  }

  delete(comment: Comments) {
    this.groupTaskService.deleteComment(comment)
  }

  editComment(comment: Comments) {
    comment.showInput = true;
    setTimeout(() => {
      this.commentInput.nativeElement.focus();
    }, 100);
  }

  saveComment(comment: Comments) {
    comment.showInput = false;
    this.groupTaskService.addUpdateComment(comment);
  }

}
