import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '@one-click/one-click-services';

@Component({
  selector: 'one-click-project-block',
  templateUrl: './project-block.component.html',
  styleUrls: ['./project-block.component.scss'],
})
export class ProjectBlockComponent implements OnInit {

  constructor(
    public activatedRoute: ActivatedRoute,
    public projectService: ProjectService
  ) {

  }

  ngOnInit(): void {
    this.projectService.getProjectData(this.activatedRoute.snapshot.params['id']);
  }
}
