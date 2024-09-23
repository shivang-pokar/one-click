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
  tabList: Array<any> = [
    {
      label: "To-dos",
      url: "todosets",
      selectedIndex: 0,
    },
    {
      label: "Message Board",
      url: "message-board",
      selectedIndex: 1,
    },
    {
      label: "Docs & Files",
      url: "docs-files",
      selectedIndex: 2,
    },
    {
      label: "Chat",
      url: "chat",
      selectedIndex: 3,
    }
  ]
  tabListView: any = ["To-dos", "Message Board", "Docs & Files", "Chat"];
  destory$: Subject<void> = new Subject<void>();
  selectedIndex: number = 0;

  constructor(
    public projectService: ProjectService,
    public router: Router
  ) {

  }

  ngOnInit(): void {
    this.tabList.forEach(el => {
      if (this.router.url.includes(el.url)) {
        this.selectedIndex = el.selectedIndex;
      }
    })
    /* this.router.url */

    console.log(this.router.url)
    console.log(this.selectedIndex)

    this.projectService.project.pipe(takeUntil(this.destory$)).subscribe(project => {
      this.project = project;
    })
  }

  tabChange(index: number) {
    this.selectedIndex = index;
    this.router.navigateByUrl(`projects/${this.project.id}/${this.tabList[index].url}`);
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }
}
