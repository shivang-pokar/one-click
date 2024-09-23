import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectBlockComponent } from './project-block.component';
import { ProjectHomeComponent } from './project/project-home/project-home.component';
import { MessageBoardComponent } from './project/message-board/message-board.component';
import { ChatRoomComponent } from './project/chat-room/chat-room.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectBlockComponent,
    children: [
      {
        path: '',
        redirectTo: 'todosets',
        pathMatch: 'full'
      },
      {
        path: 'todosets',
        component: ProjectHomeComponent,
      },
      {
        path: 'message-board',
        component: MessageBoardComponent,
      },
      {
        path: 'chat',
        component: ChatRoomComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectBlockRoutingModule { }
