import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  tabList: any = [
    {
      label: "To-dos",
      url: "todosets"
    },
    {
      label: "Message Board",
      url: "message-board"
    },
    {
      label: "Docs & Files",
      url: "docs-files"
    },
    {
      label: "Chat",
      url: "chat"
    }
  ]
  tabListView: any = ["To-dos", "Message Board", "Docs & Files", "Chat"];
  destory$: Subject<void> = new Subject<void>();

  constructor(
    public projectService: ProjectService,
    public router: Router
  ) {

  }

  ngOnInit(): void {
    this.projectService.project.pipe(takeUntil(this.destory$)).subscribe(project => {
      this.project = project;
    })
  }

  tabChange(index: number) {
    this.router.navigateByUrl(`projects/${this.project.id}/${this.tabList[index].url}`);
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }
}
