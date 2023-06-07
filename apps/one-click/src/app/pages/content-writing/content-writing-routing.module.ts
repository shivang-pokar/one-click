import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentWritingComponent } from './content-writing.component';

const routes: Routes = [
  {
    path: '',
    component: ContentWritingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentWritingRoutingModule { }
