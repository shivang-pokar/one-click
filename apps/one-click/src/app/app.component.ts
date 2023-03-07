import { Component } from '@angular/core';
import { SocialConnectService } from '@one-click/one-click-services';

@Component({
  selector: 'one-click-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'one-click';

  constructor(private socialConnectService: SocialConnectService) {
    this.socialConnectService.initFacebook();
  }

}
