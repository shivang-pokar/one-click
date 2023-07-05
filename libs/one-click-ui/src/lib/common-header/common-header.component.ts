import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company, User } from '@one-click/data';
import { AuthService, CommonServiceService } from '@one-click/one-click-services';

@Component({
  selector: 'one-click-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.scss'],
})
export class CommonHeaderComponent implements OnInit {

  routerList = [
    {
      url: '/dashboard',
      icon: 'post_add',
      label: 'Post Content'
    },
    {
      url: '/posts',
      icon: 'feed',
      label: 'Posts'
    },
    {
      url: '/channels',
      icon: 'add_circle',
      label: 'Add Channels'
    },
    {
      url: '/manage-account',
      icon: 'manage_accounts',
      label: 'Manage Account'
    },
    {
      url: '/content-writing',
      icon: 'description',
      label: 'Content Writing'
    },
    {
      url: '/settings',
      icon: 'settings',
      label: 'Settings'
    }
  ];
  company: Company;
  user: User;
  profileUrl: string = "assets/147133.png";

  constructor(
    public router: Router,
    public authService: AuthService,
    public commonServiceService: CommonServiceService
  ) {

  }
  ngOnInit(): void {

    this.commonServiceService.company.subscribe(company => {
      this.company = company;
    });

    this.commonServiceService.user.subscribe(user => {
      if (user) {
        this.user = user;
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
