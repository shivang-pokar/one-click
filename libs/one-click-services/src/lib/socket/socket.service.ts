import { Inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { io } from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public socket: any;
  constructor(
    @Inject('env') public env: any,
    private cookieService: CookieService,
  ) {

  }

  triggerSocket() {
    this.socket = io(this.env.API_BASE_URL, {
      auth: {
        token: this.cookieService.get('token'),
        userid: this.cookieService.get('uid')
      }
    });
  }

  joinCompany(companyId: string) {
    this.socket.emit('joinCompany', companyId);
  }

  joinProject(projectId: string) {
    this.socket.emit('joinProject', projectId);
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
