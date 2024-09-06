import { Injectable } from '@angular/core';
import { Company, Connection, ContentWrite, Integration, Label, Project, User, messages } from '@one-click/data';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Subject, Subscribable, Subscriber, Subscription } from 'rxjs';
import { CrudService } from '../crud/crud.service';
import { AlertService } from '../alert/alert.service';
// @ts-ignore
import _ from 'lodash';
import { labelList } from '../attr-list/attribute';
import { SocketService } from '../socket/socket.service';
import EditorJS from '@editorjs/editorjs';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import Checklist from '@editorjs/checklist';
// @ts-ignore
import Table from '@editorjs/table';
// @ts-ignore
import Quote from '@editorjs/quote';
// @ts-ignore
import NestedList from '@editorjs/nested-list';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  integration = new BehaviorSubject<Integration>(new Integration());
  company = new BehaviorSubject<Company>(new Company());
  companyData: Company;
  teamList = new BehaviorSubject<Array<Company>>([]);
  teamListData: Array<User> = [];
  labelsMap: any = {};
  user = new BehaviorSubject<Company>(new User());
  company$: Subscription;
  user$: Subscription;
  projectData: Project;

  constructor(
    private cookieService: CookieService,
    private crudService: CrudService,
    public alertService: AlertService,
    public socketService: SocketService
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

  async logedInInitSubscribe(userId?: string) {
    try {
      await this.getUser(userId);
      this.getCompany();
      this.getIntegration();
      this.getUserList();
      return;
    }
    catch (e) {
      throw e;
    }
  }

  getIntegration() {
    if (!this.companyData?.id) {
      const company_id = this.cookieService.get('company_id');
      this.crudService.collection$('integration', (req: any) => req.where('company_id', '==', company_id)).subscribe(res => {
        this.integration.next(res[0]);
      })
    }
  }

  getCompany() {
    /* if (!this.companyData?.id) {
    } */
    const company_id = this.cookieService.get('company_id');
    this.crudService.getCompanyFromId(company_id).subscribe(resp => {
      this.companyData = resp;
      this.setLabelsInMap();
      this.company.next(resp);
    });
  }

  setLabelsInMap() {
    if (this.companyData?.labels?.length) {
      this.labelsMap = this.convertArrayToMapObj(this.companyData.labels);
    }
  }

  async getUser(userId?: string) {
    try {
      const uid = userId || this.cookieService.get('uid');
      let user = await this.crudService.getUserFromId(uid).toPromise();
      this.cookieService.set('uid', user.id);
      this.cookieService.set('company_id', user.company_id || "");
      await this.socketService.triggerSocket();
      this.socketService.joinCompany(user.company_id);
      this.user.next(user);
      return user;
    }
    catch (e) {
      throw e;
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
        if (resp?.id) {
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

  stripePercentOffAmount(percent_off: number, packageAmount: number) {
    return packageAmount / 100 * percent_off;
  }


  getSubscriptionPlans() {
    return this.crudService.subscriptionPlans().toPromise();
  }

  convertArrayToMapObj(array: Array<any>, key: string = 'id') {
    return array.reduce((map, obj) => {
      if (obj[key] || typeof obj[key] === 'number') {
        map[obj[key]] = obj;
      }
      return map;
    }, {})
  }

  async updateCompnay(company: Company) {
    try {
      await this.crudService.update('company', company, company.id);
      this.alertService.success(messages.DETAILS_UPDATED);
      this.socketService.addCompany(company);
    }
    catch (e: any) {
      this.alertService.error(e.message);
    }
    return;
  }

  getGreeting() {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
      return "Good morning";
    } else if (hour >= 12 && hour < 18) {
      return "Good afternoon";
    } else if (hour >= 18 && hour < 22) {
      return "Good evening";
    } else {
      return "Good night";
    }
  }

  deepClose(obj: any) {
    return _.cloneDeep(obj)
  }

  generateRandomColor() {
    let excludeColors: any = labelList;

    while (true) {
      // Generate random RGB values
      let randomColor = [
        Math.floor(Math.random() * 256), // Red
        Math.floor(Math.random() * 256), // Green
        Math.floor(Math.random() * 256)  // Blue
      ];

      // Check if the generated color matches any of the excluded colors
      let isExcluded = excludeColors.some((color: any) => {
        let rgb = color.background.match(/\d+/g); // Extract RGB values from background string
        return randomColor[0] == parseInt(rgb[0]) &&
          randomColor[1] == parseInt(rgb[1]) &&
          randomColor[2] == parseInt(rgb[2]);
      });

      // If not excluded, return the random color
      if (!isExcluded) {
        return `rgb(${randomColor.join(', ')})`;
      }
    }
  }


  async createLabel(labelList: { labels: Array<Label> }) {
    labelList.labels.forEach(el => {
      if (!el.id) {
        el.id = this.crudService.angularFirestore.createId();
      }
    })

    await this.crudService.setLabels(labelList).toPromise()
    this.getCompany();
    return;
  }

  async createCompany(company_id: string, company_name: string) {
    const company = new Company();
    company.company_name = company_name;
    company.id = company_id;
    company.labels = labelList;
    company.masterId = this.crudService.angularFirestore.createId();
    company.timeZone = this.getTimeZone();
    return this.crudService.createCompany(company).toPromise()
  }

  getCompnayId() {
    return this.cookieService.get('company_id');
  }

  getUserList() {
    const company_id = this.getCompnayId();
    this.crudService.getUserFromCompanyId(company_id).subscribe(resp => {
      this.teamListData = resp;
      this.teamList.next(resp);
    })

  }

  editorJS(placeholder: string) {
    return new EditorJS({
      holder: 'editor',
      placeholder: placeholder,
      hideToolbar: false,
      tools: {
        header: {
          class: Header,
          inlineToolbar: ['link']
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        table: {
          class: Table,
          inlineToolbar: true
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          config: {
            quotePlaceholder: 'Enter a quote',
            captionPlaceholder: 'Quote\'s author',
          },
        },
        list: {
          class: NestedList,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
          },
        },
      }
      // Your configuration options for Editor.js
    });
  }

}
