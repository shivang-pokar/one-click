import { Injectable } from '@angular/core';
import { IntegrationData } from '@one-click/data';

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
}
