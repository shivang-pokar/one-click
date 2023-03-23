import { P } from '@angular/cdk/keycodes';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'one-click-twitter-post-ui',
  templateUrl: './twitter-post-ui.component.html',
  styleUrls: ['./twitter-post-ui.component.scss']
})
export class TwitterPostUiComponent implements OnInit {

  @Input() connection: any;

  constructor() { }

  ngOnInit(): void {
  }


}
