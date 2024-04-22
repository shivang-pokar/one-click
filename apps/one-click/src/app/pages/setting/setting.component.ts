import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from '@one-click/data';
import { CommonServiceService, CrudService } from '@one-click/one-click-services';
import { StripeService } from 'ngx-stripe';

@Component({
  selector: 'one-click-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  company: Company;
  activeTabIndex: number = 0;

  constructor(
    public crudService: CrudService,
    private commonServiceService: CommonServiceService,
  ) {

  }

  ngOnInit(): void {
    this.commonServiceService.company.subscribe(company => {
      this.company = company;
    });

  }

  activeTab(index: number) {
    this.activeTabIndex = index;
  }
}
