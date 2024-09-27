import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SocketService } from '../../socket/socket.service';
import { AlertService } from '../../alert/alert.service';
import { CrudService } from '../../crud/crud.service';
import { CommonServiceService } from '../../common-service/common-service.service';
import { CookieService } from 'ngx-cookie-service';
import { ChatRoom, messages, User } from '@one-click/data';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {

  constructor(
    public alertService: AlertService,
    public crudService: CrudService,
    public commonServiceService: CommonServiceService,
    private cookieService: CookieService,
    @Inject('env') public env: any,
    private http: HttpClient,
    public socketService: SocketService
  ) { }

  getGroupList(project_id: string) {
    return this.http.get<any>(`${this.env.API_BASE_URL}/task/chat/room/${project_id}`);
  }

  createGroupInChat(is_group: boolean, project_id: string, selectedUser?: User) {
    let chatRoom = this.createGroupInChatObj(is_group, project_id, selectedUser);
    this.addUpdateGroup(chatRoom);
  }


  createGroupInChatObj(is_group: boolean, project_id: string, selectedUser?: User) {

    let userId = this.cookieService.get('uid');
    const company_id = this.cookieService.get('company_id');
    let date = new Date().getTime()

    let chatRoom = new ChatRoom();
    chatRoom.company_id = company_id;
    chatRoom.project_id = project_id;
    chatRoom.is_group = is_group;
    chatRoom.createdBy = userId;
    chatRoom.createdAt = date
    chatRoom.members.push({ user_id: userId, joined_at: date });

    if (selectedUser) {
      chatRoom.members.push({ user_id: userId, joined_at: date });
    }

    return chatRoom;
  }

  async addUpdateGroup(chatRoom: ChatRoom, showAlert: boolean = true) {
    try {
      if (!chatRoom.id) {
        await this.createChatRoomApi(chatRoom).toPromise();;
        if (showAlert) {
          this.alertService.success(messages.GROUP_CREAT);
        }
      } else {
        await this.updateChatRoomApi(chatRoom).toPromise();
        if (showAlert) {
          this.alertService.success(messages.GROUP_UPDATE);
        }
      }
      this.socketService.addToDoChatRoom(chatRoom);
    }
    catch (e: any) {
      this.alertService.error(e.message);
    }
  }

  createChatRoomApi(chatRoom: ChatRoom) {
    chatRoom.id = this.crudService.angularFirestore.createId();
    return this.http.post<any>(`${this.env.API_BASE_URL}/task/chat`, chatRoom);
  }

  updateChatRoomApi(chatRoom: ChatRoom) {
    return this.http.put<any>(`${this.env.API_BASE_URL}/task/chat/${chatRoom.id}`, chatRoom);
  }


}
