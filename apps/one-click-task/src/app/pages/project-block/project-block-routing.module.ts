import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectBlockComponent } from './project-block.component';
import { ProjectHomeComponent } from './project/project-home/project-home.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectBlockComponent,
    children: [
      {
        path: '',
        redirectTo: 'todosets',
        pathMatch: 'full'
      },
      {
        path: 'todosets',
        component: ProjectHomeComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectBlockRoutingModule { }
