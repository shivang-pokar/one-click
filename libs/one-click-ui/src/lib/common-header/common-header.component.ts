import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company, User } from '@one-click/data';
import { AuthService, CommonServiceService, menuList } from '@one-click/one-click-services';

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

  constructor(
    public router: Router,
    public authService: AuthService,
    public commonServiceService: CommonServiceService
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

  }

  signOut() {
    this.authService.signOut();
  }

}
