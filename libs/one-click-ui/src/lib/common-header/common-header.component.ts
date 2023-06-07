import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '@one-click/data';
import { CommonServiceService } from '@one-click/one-click-services';

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

  constructor(
    public router: Router,
    public commonServiceService: CommonServiceService
  ) {

  }
  ngOnInit(): void {

    this.commonServiceService.company.subscribe(company => {
      this.company = company;
    });

  }

  signOut() {

  }

}
