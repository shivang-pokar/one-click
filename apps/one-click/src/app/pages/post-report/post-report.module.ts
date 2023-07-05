import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostReportRoutingModule } from './post-report-routing.module';
import { PostReportComponent } from './post-report.component';
import { SharedModule } from '../../share.module';

@NgModule({
  declarations: [PostReportComponent],
  imports: [
    CommonModule,
    PostReportRoutingModule,
    SharedModule
  ],
})
export class PostReportModule { }
