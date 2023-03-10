import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageAccountRoutingModule } from './manage-account-routing.module';
import { ManageAccountComponent } from './manage-account.component';
import { SharedModule } from '../../share.module';


@NgModule({
  declarations: [
    ManageAccountComponent
  ],
  imports: [
    CommonModule,
    ManageAccountRoutingModule,
    SharedModule
  ]
})
export class ManageAccountModule { }
