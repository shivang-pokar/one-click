import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Company, Project, User } from '@one-click/data';
import { AuthService, CommonServiceService, menuList, ProjectService } from '@one-click/one-click-services';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';

@Component({
  selector: 'one-click-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.scss'],
})
export class CommonHeaderComponent implements OnInit {

  routerList: Array<any> = [];
  company: Company;
  user: User;
  profileUrl: string = "assets/147133.png";

  @Input() menuAttr: any;
  menuList: any = menuList;

  private projectsSubject = new BehaviorSubject<Project[]>([]);
  projects$: Observable<Project[]> = this.projectsSubject.asObservable();
  projectId: string;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public commonServiceService: CommonServiceService,
    public projectService: ProjectService
  ) {

  }
  ngOnInit(): void {
    if (this.menuAttr) {
      this.routerList = this.menuList[this.menuAttr];
    }

    this.commonServiceService.company.subscribe(company => {
      this.company = company;
    });

    this.commonServiceService.user.subscribe(user => {
      if (user) {
        this.user = user;
        this.user.email
        if (this.user?.url) {
          this.profileUrl = this.user.url;
        }
      }
    });

    if (this.menuAttr == 'task') {
      this.getAllProject();
      this.detectUrlChanges();
    }

  }

  signOut() {
    this.authService.signOut();
  }

  getAllProject() {
    this.projectId = this.activatedRoute.snapshot.paramMap.get('id') || "";
    this.projectService.getProject().pipe(map(data => { this.projectsSubject.next(data); })).subscribe();
  }

  detectUrlChanges() {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.projectId = this.activatedRoute.snapshot.paramMap.get('id') || "";
      });
  }

}
