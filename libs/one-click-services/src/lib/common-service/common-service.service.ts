import { Injectable } from '@angular/core';
import { Connection, IntegrationData } from '@one-click/data';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Subject } from 'rxjs';
import { CrudService } from '../crud/crud.service';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  integration = new BehaviorSubject<IntegrationData>(new IntegrationData());

  constructor(
    private cookieService: CookieService,
    private crudService: CrudService,
  ) { }

  manageIntegrationList(integrationList: IntegrationData, connection: any): IntegrationData {
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

  getIntegration() {
    const company_id = this.cookieService.get('company_id')
    this.crudService.collection$('integration', (req: any) => req.where('company_id', '==', company_id)).subscribe(res => {
      this.integration.next(res[0]);
    })
  }

}
