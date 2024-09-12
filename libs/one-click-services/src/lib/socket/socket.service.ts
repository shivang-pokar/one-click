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

  leaveProjectAll() {
    this.socket.emit('leaveAllProjects')
  }

  leaveProject(projectId: string) {
    this.socket.emit('leaveProject', projectId)
  }

  leaveComments(task_id:string) {
    this.socket.emit('leaveComments', task_id)
  }

  joinGroup(groupId: string) {
    this.socket.emit('joinGroup', groupId);
  }

  joinComments(task_id: string) {
    this.socket.emit('joinComments', task_id);
  }

  onCompanyAdded(callback: (data: any) => void) {
    this.socket.on('projectAdded', callback);
  }

  onProjectAdded(callback: (data: any) => void) {
    this.socket.on('companyAdded', callback);
  }

  onTodoGroupAdded(callback: (data: any) => void) {
    this.socket.on('todoGroupAdded', callback);
  }

  onTodoTaskAdded(callback: (data: any) => void) {
    this.socket.on('todoTaskAdded', callback);
  }

  onTodoCommentsAdded(callback: (data: any) => void) {
    this.socket.on('todoCommentsAdded', callback);
  }

  addProject(projectData: any) {
    this.socket.emit('addProject', projectData);
  }

  addCompany(companyData: any) {
    this.socket.emit('addCompany', companyData);
  }

  addTodoGroup(groupData: any) {
    this.socket.emit('addTodoGroup', groupData);
  }

  addTodoComments(commentsData: any) {
    this.socket.emit('addTodoComments', commentsData);
  }

  addTodoTask(taskData: any) {
    this.socket.emit('addTodoTask', taskData);
  }

}
