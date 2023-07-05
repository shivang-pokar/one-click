import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostReportComponent } from './post-report.component';

const routes: Routes = [
  {
    path: '',
    component: PostReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostReportRoutingModule { }
