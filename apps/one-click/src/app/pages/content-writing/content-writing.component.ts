import { Component, OnInit } from '@angular/core';
import { ContentWrite } from '@one-click/data';
import { CommonServiceService, CrudService } from '@one-click/one-click-services';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'one-click-content-writing',
  templateUrl: './content-writing.component.html',
  styleUrls: ['./content-writing.component.scss'],
})
export class ContentWritingComponent implements OnInit {

  conversationObj: ContentWrite;
  contentList: Array<ContentWrite> = [];

  constructor(
    public crudService: CrudService,
    public commonServiceService: CommonServiceService,
    private cookieService: CookieService,
  ) {

  }

  ngOnInit(): void {
    this.getContent();
  }

  selectConversation(event: any) {
    this.conversationObj = event;
  }

  getContent() {
    const company_id = this.cookieService.get('company_id')
    this.crudService.getContentRealTimeOrderBy(`ai_content/${company_id}`, 'createdAt').then((chatData: any) => {
      this.contentList = [];
      chatData.forEach((item: any) => { this.contentList.push(item.val()); });
      this.contentList = this.contentList.reverse();
    })
  }

  conversationCreated() {
    this.getContent();
  }
}

