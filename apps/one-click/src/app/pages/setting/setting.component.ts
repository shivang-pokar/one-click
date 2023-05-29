import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from '@one-click/data';
import { CommonServiceService, CrudService } from '@one-click/one-click-services';
import { StripeService } from 'ngx-stripe';
import { switchMap } from 'rxjs';

@Component({
  selector: 'one-click-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  company: Company;

  constructor(
    public crudService: CrudService,
    private stripeService: StripeService,
    private activatedRoute: ActivatedRoute,
    private commonServiceService: CommonServiceService,
  ) {

  }

  ngOnInit(): void {

    this.commonServiceService.company.subscribe(company => {
      this.company = company;
    })

    /* this.activatedRoute.queryParams.subscribe(params => {
      let date = params['session_id'];
    }); */
  }
}
