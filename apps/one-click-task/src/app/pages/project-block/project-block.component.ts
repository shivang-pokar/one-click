import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CommonServiceService, ProjectService } from '@one-click/one-click-services';
import { filter } from 'rxjs';

@Component({
  selector: 'one-click-project-block',
  templateUrl: './project-block.component.html',
  styleUrls: ['./project-block.component.scss'],
})
export class ProjectBlockComponent implements OnInit {

  constructor(
    public activatedRoute: ActivatedRoute,
    public projectService: ProjectService,
    public commonServiceService: CommonServiceService,
    private router: Router
  ) {

  }

  ngOnInit(): void {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.initializeProject();
      });

    this.commonServiceService.user.subscribe(user => {
      if (user.id) {
        this.projectService.setProject(this.activatedRoute.snapshot.params['id']);
      }
    })
  }

  private initializeProject(): void {
    this.projectService.setProject(this.activatedRoute.snapshot.params['id']);
  }

}
