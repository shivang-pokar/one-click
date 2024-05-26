import { Inject, Injectable } from '@angular/core';
import { AlertService } from '../../alert/alert.service';
import { Project, Task, TaskType, messages } from '@one-click/data';
import { CrudService } from '../../crud/crud.service';
import { CommonServiceService } from '../../common-service/common-service.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { SocketService } from '../../socket/socket.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  project = new BehaviorSubject<Project>(new Project());
  projectData: Project;
  project$: Subscription;

  constructor(
    public alertService: AlertService,
    public crudService: CrudService,
    public commonServiceService: CommonServiceService,
    private cookieService: CookieService,
    @Inject('env') public env: any,
    private http: HttpClient,
    public socketService: SocketService
  ) { }

  /* Crete Project Popup */
  async openCreateProject(project?: Project): Promise<Project> {
    return new Promise((resolve, reject) => {
      this.alertService.openCreateProject(project).afterClosed().subscribe(resp => {
        resolve(resp);
      })
    })
  }

  /* Create Project */
  async createProject(project?: Project) {
    project = await this.openCreateProject(project);
    if (project) {
      this.addUpdateProject(project);
    }
  }

  /* Add/Update Project In Database */
  async addUpdateProject(project: Project) {
    try {
      if (!project.id) {
        await this.createProjectApi(project).toPromise();
        this.alertService.success(messages.PROJECT_CREATE);
      } else {
        await this.updateProject(project).toPromise();
        this.alertService.success(messages.PROJECT_UPDATE);
      }
      this.socketService.addProject(project);
    }
    catch (e: any) {
      this.alertService.error(e.message);
    }
  }

  /* Get Project List */
  getProject() {
    const company_id = this.cookieService.get('company_id')
    return this.http.get<any>(`${this.env.API_BASE_URL}/task/projects/by-company/${company_id}`);
  }

  createProjectApi(project: Project) {
    project.id = this.crudService.angularFirestore.createId();
    return this.http.post<any>(`${this.env.API_BASE_URL}/task/project`, project);
  }

  updateProject(project: Project) {
    return this.http.put<any>(`${this.env.API_BASE_URL}/task/project/${project.id}`, project);
  }

  deleteProjectApi(project_id: string) {
    return this.http.delete<any>(`${this.env.API_BASE_URL}/task/project/${project_id}`);
  }

  getProjectById(project_id: string) {
    return this.http.get<any>(`${this.env.API_BASE_URL}/task/project/${project_id}`);
  }

  selectLabelInProject(project: Project, labelId: string) {
    project.label = labelId;
    this.addUpdateProject(project);
  }

  /* Delete Project */
  deleteProject(project: Project) {
    this.alertService.confirmationDialog(messages.ARE_YOU_SURE_DELETE).afterClosed().subscribe(async resp => {
      if (resp) {
        try {
          project.deleteFlag = "Y";
          await this.deleteProjectApi(project.id).toPromise();
          this.socketService.addProject(project);
          this.alertService.success(messages.DELETED);
        }
        catch (e: any) {
          this.alertService.error(e.message);
        }
      }
    })
  }

  updateProjectList(recentProjects: Array<Project>, project: Project): Array<Project> {
    let index = recentProjects.findIndex(el => el.id === project.id);
    if (project.deleteFlag === "N") {
      if (index > -1) {
        recentProjects[index] = project;
      } else {
        recentProjects.push(project);
      }
    } else if (index > -1) {
      recentProjects.splice(index, 1);
    }

    return recentProjects;
  }

  setProject(project_id: string) {
    this.getProjectById(project_id).subscribe(resp => {
      this.project.next(resp);
      this.socketService.joinProject(project_id);
    });
  }

}
