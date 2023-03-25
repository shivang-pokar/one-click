import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
      url: '/settings',
      icon: 'settings',
      label: 'Settings'
    }
  ]

  constructor(
    public router: Router
  ) {

  }
  ngOnInit(): void {

  }
}
