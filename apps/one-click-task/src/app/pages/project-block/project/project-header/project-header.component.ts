import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project } from '@one-click/data';
import { ProjectService } from '@one-click/one-click-services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'one-click-project-header',
  templateUrl: './project-header.component.html',
  styleUrls: ['./project-header.component.scss'],
})
export class ProjectHeaderComponent implements OnInit, OnDestroy {

  project: Project;
  tabList: any = ["To-dos", "Message Board", "Docs & Files", "Chat"];
  destory$: Subject<void> = new Subject<void>();

  constructor(public projectService: ProjectService) {

  }

  ngOnInit(): void {
    this.projectService.project.pipe(takeUntil(this.destory$)).subscribe(project => {
      this.project = project;
    })
  }

  tabChange(index: number) {
    console.log(index)
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }
}
