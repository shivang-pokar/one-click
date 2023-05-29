import { Injectable } from '@angular/core';
import { Company, Connection, Integration } from '@one-click/data';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Subject } from 'rxjs';
import { CrudService } from '../crud/crud.service';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  integration = new BehaviorSubject<Integration>(new Integration());
  company = new BehaviorSubject<Company>(new Company());

  constructor(
    private cookieService: CookieService,
    private crudService: CrudService,
  ) { }

  manageIntegrationList(integrationList: Integration, connection: any): Integration {
    let index: number = integrationList.integrationList?.findIndex((integration: any) => connection.id == integration.id);
    if (index >= 0) {
      integrationList.integrationList[index] = connection;
    } else {
      integrationList.integrationList.push(connection);
    }
    return integrationList;
  }

  getImageRation(width: number, height: number) {
    let r = this.gcd(width, height);
    return `${width / r}:${height / r}`;
  }

  gcd(a: number, b: number): number {
    return (b == 0) ? a : this.gcd(b, a % b);
  }

  validateRationImage(width: number, height: number, connection: Connection) {
    return width / height >= connection.imageRationMin && width / height <= connection.imageRationMax;
  }

  logedInInitSubscribe() {
    this.getIntegration();
    this.getCompany();
  }

  getIntegration() {
    const company_id = this.cookieService.get('company_id')
    this.crudService.collection$('integration', (req: any) => req.where('company_id', '==', company_id)).subscribe(res => {
      this.integration.next(res[0]);
    })
  }

  getCompany() {
    const company_id = this.cookieService.get('company_id');
    this.crudService.collection$('company', (req: any) => req.where('id', '==', company_id)).subscribe(res => {
      this.company.next(res[0]);
    })
  }

  getTimeZone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  getTimeZoneList() {
    let intl: any = Intl;
    return intl.supportedValuesOf('timeZone')
  }

}
