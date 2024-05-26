import { Component, OnInit } from '@angular/core';
import { Project } from '@one-click/data';
import { CommonServiceService, ProjectService, SocketService } from '@one-click/one-click-services';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Component({
  selector: 'one-click-task-project-list',
  templateUrl: './task-project-list.component.html',
  styleUrls: ['./task-project-list.component.scss'],
})
export class TaskProjectListComponent implements OnInit {

  /* projects$: Observable<Project[]>; */

  private projectsSubject = new BehaviorSubject<Project[]>([]);
  projects$: Observable<Project[]> = this.projectsSubject.asObservable();


  constructor(
    public projectService: ProjectService,
    private socketService: SocketService,
    private commonServiceService: CommonServiceService,
  ) {

  }

  ngOnInit(): void {
    this.commonServiceService.user.subscribe(user => {
      if (user.id) {
        this.socketService.onProjectAdded((project) => {
          this.updateLatestProject(project);
        });
      }
    })

    this.getAllProject();
  }

  getAllProject() {
    this.projectService.getProject().pipe(map(data => { this.projectsSubject.next(data); })).subscribe();
  }

  trackByIndex(index: number, item: any) {
    return item?.id;
  }

  updateLatestProject(project: Project) {
    this.projectsSubject.next(this.projectService.updateProjectList(this.projectsSubject.getValue(), project));
  }

}
