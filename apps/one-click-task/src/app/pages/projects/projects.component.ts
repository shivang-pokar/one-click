import { Component, OnDestroy, OnInit } from '@angular/core';
import { Company } from '@one-click/data';
import { AlertService, CommonServiceService, ProjectService, labelList } from '@one-click/one-click-services';

@Component({
  selector: 'one-click-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, OnDestroy {

  project$: any;
  tabList: any = ["Active", "Completed", "Trashed", "Template"];
  company: Company

  constructor(
    public projectService: ProjectService,
    public commonServiceService: CommonServiceService
  ) { }

  ngOnInit(): void {
    
  }

  openCreateProject() {
    this.projectService.createProject();
  }

  ngOnDestroy(): void {
    
  }
}
