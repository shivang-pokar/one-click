import { Component, OnInit } from '@angular/core';
import { Project } from '@one-click/data';
import { ProjectService } from '@one-click/one-click-services';
import { Observable } from 'rxjs';

@Component({
  selector: 'one-click-task-project-list',
  templateUrl: './task-project-list.component.html',
  styleUrls: ['./task-project-list.component.scss'],
})
export class TaskProjectListComponent implements OnInit {

  project$: Observable<Project[]>;

  constructor(
    public projectService: ProjectService
  ) {

  }

  ngOnInit(): void {
    this.project$ = this.projectService.getProject();
  }
}
