import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthChannelRoutingModule } from './auth-channel-routing.module';
import { AuthChannelComponent } from './auth-channel.component';
import { SharedModule } from '../../share.module';


@NgModule({
  declarations: [
    AuthChannelComponent
  ],
  imports: [
    CommonModule,
    AuthChannelRoutingModule,
    SharedModule
  ]
})
export class AuthChannelModule { }
