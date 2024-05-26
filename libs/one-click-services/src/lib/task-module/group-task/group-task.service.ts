import { Inject, Injectable } from '@angular/core';
import { AlertService } from '../../alert/alert.service';
import { CrudService } from '../../crud/crud.service';
import { CommonServiceService } from '../../common-service/common-service.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { SocketService } from '../../socket/socket.service';
import { Group, messages } from '@one-click/data';

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

}
