import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersPageComponent } from './members.component';

const routes: Routes = [{ path: '', component: MembersPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
