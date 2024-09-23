import { Inject, Injectable } from '@angular/core';
import { AlertService } from '../../alert/alert.service';
import { CrudService } from '../../crud/crud.service';
import { CommonServiceService } from '../../common-service/common-service.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { SocketService } from '../../socket/socket.service';
import { Comments, Group, Task, messages } from '@one-click/data';

@Injectable({
  providedIn: 'root'
})
export class GroupTaskService {

  constructor(
    public alertService: AlertService,
    public crudService: CrudService,
    public commonServiceService: CommonServiceService,
    private cookieService: CookieService,
    @Inject('env') public env: any,
    private http: HttpClient,
    public socketService: SocketService
  ) { }

  getGroups(project_id: string) {
    return this.http.get<any>(`${this.env.API_BASE_URL}/task/group/by-project/${project_id}`);
  }

  createGroupObj(groupName: string, project_id: string) {
    const company_id = this.cookieService.get('company_id');
    let group = new Group();
    group.groupName = groupName;
    group.company_id = company_id;
    group.project_id = project_id;
    return group;
  }

  createGroup(groupName: string, project_id: string) {
    let group = this.createGroupObj(groupName, project_id);
    this.addUpdateGroup(group);
  }

  async addUpdateGroup(group: Group, showAlert: boolean = true) {
    try {
      if (!group.id) {
        await this.createGroupApi(group).toPromise();;
        if (showAlert) {
          this.alertService.success(messages.GROUP_CREAT);
        }
      } else {
        await this.updateGroupApi(group).toPromise();
        if (showAlert) {
          this.alertService.success(messages.GROUP_UPDATE);
        }
      }
      this.socketService.addTodoGroup(group);
    }
    catch (e: any) {
      this.alertService.error(e.message);
    }
  }


  createGroupApi(group: Group) {
    group.id = this.crudService.angularFirestore.createId();
    return this.http.post<any>(`${this.env.API_BASE_URL}/task/group`, group);
  }

  updateGroupApi(group: Group) {
    return this.http.put<any>(`${this.env.API_BASE_URL}/task/group/${group.id}`, group);
  }

  async openCloseGroup(group: Group) {
    group.isOpen = !group.isOpen;
    await this.addUpdateGroup(group, false);
    return group;
  }

  async createTask(group_id: string) {
    try {
      let taskObj = this.createTaskObj(group_id);
      let task = await this.addUpdateTask(taskObj, false);
      return task;
    }
    catch (e) {
      throw e;
    }
  }

  createTaskObj(group_id: string) {
    const company_id = this.cookieService.get('company_id');
    const project_id = this.commonServiceService.projectData.id;
    let task = new Task();
    task.taskName = "Task";
    task.company_id = company_id;
    task.project_id = project_id;
    task.group_id = group_id;
    return task;
  }

  async addUpdateTask(task: Task, showAlert: boolean = true) {
    try {
      if (!task.id) {
        await this.createTaskApi(task).toPromise();
        if (showAlert) {
          this.alertService.success(messages.TASK_CREAT);
        }
      } else {
        await this.updateTaskApi(task).toPromise();
        if (showAlert) {
          this.alertService.success(messages.TASK_UPDATE);
        }
      }
      this.socketService.addTodoTask(task);
      return task;
    }
    catch (e: any) {
      this.alertService.error(e.message);
      throw e;
    }
  }

  createTaskApi(task: Task) {
    task.id = this.crudService.angularFirestore.createId();
    return this.http.post<any>(`${this.env.API_BASE_URL}/task/task-item`, task);
  }

  updateTaskApi(task: any) {
    return this.http.put<any>(`${this.env.API_BASE_URL}/task/task-item/${task.id}`, task);
  }

  getTaskByGroup(group_id: string) {
    return this.http.get<any>(`${this.env.API_BASE_URL}/task/task-item/by-group/${group_id}`);
  }

  deleteTaskApi(task_id: string) {
    return this.http.delete<any>(`${this.env.API_BASE_URL}/task/task-item/${task_id}`);
  }

  getUpdateTaskList(taskList: Array<any> = [], task: any) {
    let index = taskList.findIndex(el => el.id == task.id);
    if (index > -1) {
      if (taskList[index].deleteFlag == "Y") {
        taskList = taskList.filter(el => el.id != taskList[index].id);
      } else {
        task = this.commonServiceService.deepClose(task);
        Object.keys(task).forEach((key: string) => {
          taskList[index][key] = task[key];
        })
      }
    } else {
      taskList.push(task);
    }

    return taskList;
  }

  deleteTask(task: Task) {
    return new Promise((resolve, reject) => {
      this.alertService.confirmationDialog(messages.ARE_YOU_SURE_DELETE).afterClosed().subscribe(async resp => {
        if (resp) {
          await this.deleteTaskApi(task.id).toPromise();
          task.deleteFlag = "Y";
          this.socketService.addTodoTask(task);
          this.alertService.success(messages.DELETED);
          resolve(true);
        } else {
          resolve(false);
        }
      }, er => {
        resolve(false);
      })
    })
  }

  async updateTaskDataOnly(data: any) {
    if (data.id) {
      await this.addUpdateTask(data, false)
      /* this.alertService.success(messages.TASK_UPDATE); */
    }
  }

  /* Comment */

  async createComment(task_id: string, comment: string) {
    try {
      let taskObj = this.createCommentObject(task_id, comment);
      let task = await this.addUpdateComment(taskObj, false);
      return task;
    }
    catch (e) {
      throw e;
    }
  }


  createCommentObject(task_id: string, comment: string) {
    const company_id = this.cookieService.get('company_id');
    const project_id = this.commonServiceService.projectData.id;

    let comments = new Comments();
    comments.company_id = company_id;
    comments.project_id = project_id;
    comments.task_id = task_id;
    comments.comment = comment;
    comments.createdBy = this.cookieService.get('uid');

    return comments;
  }

  createCommentApi(comments: Comments) {
    comments.id = this.crudService.angularFirestore.createId();
    return this.http.post<any>(`${this.env.API_BASE_URL}/task/comments`, comments);
  }

  updateCommentApi(comments: Comments) {
    return this.http.put<any>(`${this.env.API_BASE_URL}/task/comments/${comments.id}`, comments);
  }

  async addUpdateComment(comments: Comments, showAlert: boolean = true) {
    try {
      if (!comments.id) {
        await this.createCommentApi(comments).toPromise();
        if (showAlert) {
          this.alertService.success(messages.TASK_CREAT);
        }
      } else {
        await this.updateCommentApi(comments).toPromise();
        if (showAlert) {
          this.alertService.success(messages.TASK_UPDATE);
        }
      }
      this.socketService.addTodoComments(comments);
      return comments;
    }
    catch (e: any) {
      this.alertService.error(e.message);
      throw e;
    }
  }

  getCommentsForTask(task_id: string) {
    return this.http.get<any>(`${this.env.API_BASE_URL}/task/comments/task/${task_id}`);
  }

  deleteCommentApi(comment_id: string) {
    return this.http.delete<any>(`${this.env.API_BASE_URL}/task/comments/${comment_id}`);
  }

  deleteComment(comment: Comments) {
    this.alertService.confirmationDialog(messages.ARE_YOU_SURE_DELETE).afterClosed().subscribe(async resp => {
      if (resp) {
        await this.deleteCommentApi(comment.id).toPromise();
        comment.deleteFlag = "Y";
        this.socketService.addTodoComments(comment);
        this.alertService.success(messages.DELETED);
      }
    })
  }





}
