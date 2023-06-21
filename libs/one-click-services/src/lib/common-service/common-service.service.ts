import { Injectable } from '@angular/core';
import { Company, Connection, ContentWrite, Integration, User } from '@one-click/data';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Subject, Subscribable, Subscriber, Subscription } from 'rxjs';
import { CrudService } from '../crud/crud.service';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  integration = new BehaviorSubject<Integration>(new Integration());
  company = new BehaviorSubject<Company>(new Company());
  user = new BehaviorSubject<Company>(new User());
  company$: Subscription;
  user$: Subscription;

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
  validateRationReel(width: number, height: number, connection: Connection) {
    return Number((width / height).toFixed(2)) >= connection.shortVideoRationMin && Number((width / height).toFixed(2)) <= connection.shortVideoRationMax;
  }

  logedInInitSubscribe() {
    this.getIntegration();
    this.getCompany();
    this.getUser();
  }

  getIntegration() {
    if (!this.company$) {
      const company_id = this.cookieService.get('company_id')
      this.crudService.collection$('integration', (req: any) => req.where('company_id', '==', company_id)).subscribe(res => {
        this.integration.next(res[0]);
      })
    }
  }

  getCompany() {
    if (!this.company$) {
      const company_id = this.cookieService.get('company_id');
      this.company$ = this.crudService.collection$('company', (req: any) => req.where('id', '==', company_id)).subscribe(res => {
        this.company.next(res[0]);
      });
    }
  }

  getUser() {
    if (!this.user$) {
      const uid = this.cookieService.get('uid');
      this.user$ = this.crudService.collection$('users', (req: any) => req.where('id', '==', uid)).subscribe(res => {
        this.user.next(res[0]);
      });
    }
  }

  getTimeZone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  getTimeZoneList() {
    let intl: any = Intl;
    return intl.supportedValuesOf('timeZone')
  }

  getCompanyPromise(): Promise<Company> {
    return new Promise((resolve, reject) => {
      this.company.subscribe(resp => {
        if (resp.id) {
          resolve(resp);
        } else {
          this.logedInInitSubscribe();
        }
      })
    })
  }

  diffTime(timestamp1: number, timestamp2: number) {
    var difference = timestamp1 - timestamp2;
    var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);

    return daysDifference;
  }

  writeContentGpt(conversationObj: ContentWrite) {
    return new Promise((resolve, rejecy) => {
      let UID = this.cookieService.get('uid');
      let company_id = this.cookieService.get('company_id');
      this.crudService.createContent(conversationObj, UID).subscribe(async resp => {
        let createContent: ContentWrite = this.createContentObj(conversationObj, resp)
        await this.crudService.setRealTimeData(`ai_content/${company_id}/${createContent.id}`, createContent)
        resolve(createContent);
      })
    })
  }

  createContentObj(conversationObj: ContentWrite, resp: any) {
    conversationObj.messages.push({
      role: resp.choices[0].message.role,
      content: resp.choices[0].message.content
    });
    return conversationObj;
  }

}
