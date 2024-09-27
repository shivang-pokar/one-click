import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatRoom, Project } from '@one-click/data';
import { ChatRoomService, GroupTaskService, ProjectService, SocketService } from '@one-click/one-click-services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'one-click-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit, OnDestroy {

  destory$: Subject<void> = new Subject<void>();
  comment: string = "";
  toggleEmoji: boolean = false;
  project: Project;
  chatRoomList: Array<ChatRoom> = [];

  constructor(
    public chatRoomService: ChatRoomService,
    public activatedRoute: ActivatedRoute,
    public projectService: ProjectService,
    public socketService: SocketService,
    public groupTaskService: GroupTaskService
  ) {

  }

  ngOnInit(): void {
    this.projectService.project.pipe(takeUntil(this.destory$)).subscribe(project => {
      if (project.id && !this.project) {
        this.project = project;
        this.socketService.joinGroup(this.project.id);
        this.getGroupList();
      }
    })


  }

  getGroupList() {
    this.chatRoomService.getGroupList(this.project.id).subscribe(resp => {
      this.chatRoomList = resp;
      console.log(resp)
    })
  }


  select(evnet: any) {
    console.log(evnet);
  }

  selectemoji(event: any) {
    this.comment = this.comment + event.emoji.native;
    this.toggleEmoji = false;
  }

  getChatRoomList() {
    this.socketService.onTodoTaskAdded(data => {
      if (this.project.id == data.project_id) {
        this.chatRoomList = this.groupTaskService.getUpdateTaskList(this.chatRoomList, data);
      }
    })
  }

  ngOnDestroy(): void {
    if (this.project?.id) {
      this.socketService.leaveChatRoom(this.project.id);
    }
  }
}
