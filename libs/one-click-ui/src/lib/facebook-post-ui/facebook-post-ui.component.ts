import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonServiceService } from '@one-click/one-click-services';

@Component({
  selector: 'one-click-facebook-post-ui',
  templateUrl: './facebook-post-ui.component.html',
  styleUrls: ['./facebook-post-ui.component.scss']
})
export class FacebookPostUiComponent implements OnInit {

  @Input() connection: any;

  constructor(
    public commonServiceService: CommonServiceService
  ) {

  }

  ngOnInit(): void {
    //console.log(this.commonServiceService.validateRationImage(screen.width, screen.height))
  }

}
