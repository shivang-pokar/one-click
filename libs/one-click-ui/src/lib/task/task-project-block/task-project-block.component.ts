import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company, Project } from '@one-click/data';
import { CommonServiceService, ProjectService, labelList } from '@one-click/one-click-services';

@Component({
  selector: 'one-click-task-project-block',
  templateUrl: './task-project-block.component.html',
  styleUrls: ['./task-project-block.component.scss'],
})
export class TaskProjectBlockComponent implements OnInit {

  @Input() project: Project;
  date = new Date();
  labels: Array<any> = [];
  labelsInit: Array<any> = [];
  labelListInput: string = "";
  labelMap: any = {};


  constructor(
    public projectService: ProjectService,
    public commonServiceService: CommonServiceService,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    this.commonServiceService.company.subscribe(company => {
      if (company) {
        this.labels = company?.labels;
        this.labelsInit = this.commonServiceService.deepClose(company?.labels);
        this.labelMap = this.commonServiceService.convertArrayToMapObj(this.labelsInit);
      }
    });
  }

  filterLabels() {
    this.labels = this.labelsInit.filter(item =>
      item.labelName.toLowerCase().includes(this.labelListInput.toLowerCase())
    );
  }

  async createLabel() {
    await this.commonServiceService.createLabel(this.labelListInput);
    this.labelListInput = "";
  }

  setLabelInProject(id: string) {
    this.projectService.selectLabelInProject(this.project, id);
  }

  createProject() {
    this.projectService.createProject(this.project);
  }

  delete() {
    this.projectService.deleteProject(this.project);
  }

  navigateToRoute() {
    this.router.navigateByUrl(`projects/${this.project.id}`);
  }

}
