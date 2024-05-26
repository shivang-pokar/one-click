import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Group, Project } from '@one-click/data';
import { GroupTaskService, ProjectService } from '@one-click/one-click-services';
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
  groupList: Array<Group> = [];

  constructor(
    public projectService: ProjectService,
    public groupTaskService: GroupTaskService
  ) {

  }

  ngOnInit(): void {
    this.projectService.project.pipe(takeUntil(this.destory$)).subscribe(project => {
      if (project.id) {
        this.project = project;
        this.getGroupList();
      }
    })
  }

  async addGroup() {
    if (this.groupName && this.project.id) {
      this.groupTaskService.createGroup(this.groupName, this.project.id);
    }
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

  getGroupList() {
    this.groupTaskService.getGroups(this.project.id).subscribe(resp => {
      this.groupList = resp;
      console.log(this.groupList)
    })
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const scrollOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    console.log('Scroll Event:', scrollOffset);

    // You can add your logic here based on scrollOffset
    // For example, you might want to add a class to an element when scrolling past a certain point
    // Or trigger lazy loading of images/content, etc.
  }


}
