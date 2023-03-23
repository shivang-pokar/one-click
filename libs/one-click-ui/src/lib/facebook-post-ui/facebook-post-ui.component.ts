import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'one-click-facebook-post-ui',
  templateUrl: './facebook-post-ui.component.html',
  styleUrls: ['./facebook-post-ui.component.scss']
})
export class FacebookPostUiComponent implements OnInit {

  @Input() connection: any;

  constructor(

  ) {

  }

  ngOnInit(): void {

  }

}
