import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentWritingRoutingModule } from './content-writing-routing.module';
import { ContentWritingComponent } from './content-writing.component';
import { SharedModule } from '../../share.module';

@NgModule({
  declarations: [ContentWritingComponent],
  imports: [
    CommonModule,
    ContentWritingRoutingModule,
    SharedModule
  ],
})
export class ContentWritingModule { }
