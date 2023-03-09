import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthChannelComponent } from './auth-channel.component';

const routes: Routes = [
  {
    path: '',
    component: AuthChannelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthChannelRoutingModule { }
