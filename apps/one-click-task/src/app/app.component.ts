import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '@one-click/one-click-services';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'one-click-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
    private commonServiceService: CommonServiceService,
  ) {

  }

  ngOnInit(): void {
    const company_id: string = this.cookieService.get('company_id') || null;
    if (company_id) {
      this.commonServiceService.logedInInitSubscribe();
    }
  }
}
