import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonServiceService, ProjectService } from '@one-click/one-click-services';

@Component({
  selector: 'one-click-project-block',
  templateUrl: './project-block.component.html',
  styleUrls: ['./project-block.component.scss'],
})
export class ProjectBlockComponent implements OnInit {

  constructor(
    public activatedRoute: ActivatedRoute,
    public projectService: ProjectService,
    public commonServiceService: CommonServiceService
  ) {

  }

  ngOnInit(): void {
    this.commonServiceService.user.subscribe(user => {
      if (user.id) {
        this.projectService.setProject(this.activatedRoute.snapshot.params['id']);
      }
    })
  }
}
