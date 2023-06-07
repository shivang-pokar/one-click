import { Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ContentWrite } from '@one-click/data';
import { CommonServiceService, CrudService } from '@one-click/one-click-services';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'one-click-content-writing-ui',
  templateUrl: './content-writing-ui.component.html',
  styleUrls: ['./content-writing-ui.component.scss'],
})
export class ContentWritingUiComponent implements OnInit, OnChanges {

  content: string;
  contentList: Array<ContentWrite> = [];
  conversationId: string;
  @Input() conversationObj: ContentWrite;
  @Input() conversationCreated = new EventEmitter();
  isloading: boolean = false;

  constructor(
    public crudService: CrudService,
    public commonServiceService: CommonServiceService,
    private cookieService: CookieService,
  ) {
  }

  ngOnInit(): void {
  }

  async createContent() {
    if (this.content && !this.isloading) {
      try {
        this.isloading = true
        this.createConversation();
        this.content = null;
        this.conversationObj = await this.commonServiceService.writeContentGpt(this.conversationObj);
        this.conversationCreated.emit();
        this.isloading = false;
      }
      catch (e) {
        this.isloading = false;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['conversationObj']) {
      console.log(this.conversationObj)
    }
  }

  createConversation() {
    if (!this.conversationObj?.id) {
      this.conversationObj = new ContentWrite();
      this.conversationObj.id = this.crudService.angularFirestore.createId();
      this.conversationObj.messages = [];
      this.conversationObj.company_id = this.cookieService.get('company_id')
      this.conversationObj.messages.push({
        role: 'user',
        content: this.content
      });
    } else {
      this.conversationObj.messages.push({
        role: 'user',
        content: this.content
      });
    }
    return this.conversationObj;
  }

}
