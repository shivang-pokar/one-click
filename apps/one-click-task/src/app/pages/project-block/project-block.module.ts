import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectBlockRoutingModule } from './project-block-routing.module';
import { ProjectBlockComponent } from './project-block.component';
import { SharedModule } from '../../share.module';
import { MessageBoardComponent } from './project/message-board/message-board.component';

@NgModule({
  declarations: [ProjectBlockComponent],
  imports: [CommonModule, ProjectBlockRoutingModule, SharedModule],
})
export class ProjectBlockModule { }
