import { Component, OnInit } from '@angular/core';
import { Company, messages } from '@one-click/data';
import { AlertService, CommonServiceService, CrudService } from '@one-click/one-click-services';

@Component({
  selector: 'one-click-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit {

  company: Company;
  workspaceName: string;
  timeZone: string;
  timeZoneList: Array<string> = [];

  constructor(
    public commonServiceService: CommonServiceService,
    public crudService: CrudService,
    public alertService: AlertService,
  ) {
    this.timeZoneList = this.commonServiceService.getTimeZoneList()
  }

  ngOnInit(): void {
    this.commonServiceService.company.subscribe(company => {
      if (company) {
        this.company = company;
        this.workspaceName = this.company.company_name;
        this.timeZone = this.company.timeZone;
        console.log(this.company)
      }
    });
  }

  async saveCompany() {
    if (this.workspaceName && this.timeZone) {
      this.company.company_name = this.workspaceName;
      this.company.timeZone = this.timeZone;
      try {
        await this.crudService.update('company', this.company, this.company.id);
        this.alertService.success(messages.DETAILS_UPDATED)
      }
      catch (e: any) {
        this.alertService.error(e.message)
      }
    } else {
      this.alertService.error(messages.NAME_TIMEZONE_REQUIRED);
    }
  }


}
