import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { MembersPageComponent } from './members.component';
import { SharedModule } from '../../share.module';

@NgModule({
  declarations: [MembersPageComponent],
  imports: [
    CommonModule,
    MembersRoutingModule,
    SharedModule
  ],
})
export class MembersModule { }
