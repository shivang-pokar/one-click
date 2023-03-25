import { Component, Input, OnInit } from '@angular/core';
import { IntegrationData, PostContent } from '@one-click/data';

@Component({
  selector: 'one-click-social-chip',
  templateUrl: './social-chip.component.html',
  styleUrls: ['./social-chip.component.scss'],
})
export class SocialChipComponent implements OnInit {

  @Input() social: PostContent;
  @Input() integration: any;
  @Input() selected: boolean = false;
  selectedIntegration: any;
  constructor() {
  }

  ngOnInit(): void {
  }
}
