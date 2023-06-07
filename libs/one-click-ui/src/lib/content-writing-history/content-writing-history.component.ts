import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContentWrite } from '@one-click/data';
import { CommonServiceService, CrudService } from '@one-click/one-click-services';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'one-click-content-writing-history',
  templateUrl: './content-writing-history.component.html',
  styleUrls: ['./content-writing-history.component.scss'],
})
export class ContentWritingHistoryComponent {

  @Output() selectConversation = new EventEmitter();
  @Input() contentList: Array<ContentWrite> = [];

  constructor(
    public crudService: CrudService,
    public commonServiceService: CommonServiceService,
    private cookieService: CookieService,
  ) {

  }

  openContent(content: ContentWrite) {
    this.selectConversation.emit(content);
  }

  newContent() {
    this.selectConversation.emit(null);
  }
}
