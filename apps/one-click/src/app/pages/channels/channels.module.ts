import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChannelsRoutingModule } from './channels-routing.module';
import { SharedModule } from '../../share.module';
import { ChannelsComponent } from './channels.component';


@NgModule({
  declarations: [
    ChannelsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ChannelsRoutingModule,
  ]
})
export class ChannelsModule { }
