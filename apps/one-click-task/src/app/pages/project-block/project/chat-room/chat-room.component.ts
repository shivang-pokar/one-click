import { Component } from '@angular/core';

@Component({
  selector: 'one-click-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent {
  comment: string = "";
  toggleEmoji: boolean = false;


  select(evnet: any) {
    console.log(evnet);
  }

  selectemoji(event: any) {
    this.comment = this.comment + event.emoji.native;
    this.toggleEmoji = false;
  }
}
