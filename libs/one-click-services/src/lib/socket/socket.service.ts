import { Inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { io } from 'socket.io-client';
import * as firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public socket: any;
  firebase = firebase.default;
  constructor(
    @Inject('env') public env: any,
    private cookieService: CookieService,
  ) {

  }

  async triggerSocket() {
    let token = await this.firebase?.auth()?.currentUser?.getIdToken()
    this.socket = io(this.env.API_BASE_URL, {
      auth: {
        token: token,
        userid: this.cookieService.get('uid')
      }
    });
    return;
  }

  joinCompany(companyId: string) {
    this.socket.emit('joinCompany', companyId);
  }

  joinProject(projectId: string) {
    this.socket.emit('joinProject', projectId);
  }

  joinGroup(groupId: string) {
    this.socket.emit('joinGroup', groupId);
  }

  onProjectAdded(callback: (data: any) => void) {
    this.socket.on('projectAdded', callback);
  }

  onTodoGroupAdded(callback: (data: any) => void) {
    this.socket.on('todoGroupAdded', callback);
  }

  onTodoTaskAdded(callback: (data: any) => void) {
    this.socket.on('todoTaskAdded', callback);
  }

  addProject(projectData: any) {
    this.socket.emit('addProject', projectData);
  }

  addTodoGroup(groupData: any) {
    this.socket.emit('addTodoGroup', groupData);
  }

  addTodoTask(taskData: any) {
    this.socket.emit('addTodoTask', taskData);
  }

}
