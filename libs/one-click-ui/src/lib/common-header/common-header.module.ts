import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonHeaderComponent } from './common-header.component';
import { SharedModule } from '../share.module';



@NgModule({
  declarations: [CommonHeaderComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CommonHeaderComponent
  ]
})
export class CommonHeaderModule { }
