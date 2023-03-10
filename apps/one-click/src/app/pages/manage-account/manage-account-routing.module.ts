import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageAccountComponent } from './manage-account.component';

const routes: Routes = [
  {
    path: '',
    component: ManageAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageAccountRoutingModule { }
