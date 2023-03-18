import { Injectable } from '@angular/core';
import { Connection, IntegrationData } from '@one-click/data';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor() { }

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

}
