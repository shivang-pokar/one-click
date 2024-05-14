import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project } from '@one-click/data';
import { ProjectService } from '@one-click/one-click-services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'one-click-project-home',
  templateUrl: './project-home.component.html',
  styleUrls: ['./project-home.component.scss'],
})
export class ProjectHomeComponent implements OnInit, OnDestroy {

  groupName: string;
  project: Project;
  destory$: Subject<void> = new Subject<void>();

  constructor(
    public projectService: ProjectService
  ) {

  }

  ngOnInit(): void {
    this.projectService.project.pipe(takeUntil(this.destory$)).subscribe(project => {
      this.project = project;
    })
  }

  async addGroup() {
    if (this.groupName && this.project.id) {
      await this.projectService.createGroup(this.groupName, this.project.id);
      this.groupName = "";
    }
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }
}
