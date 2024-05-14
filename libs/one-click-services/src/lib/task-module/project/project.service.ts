import { Injectable } from '@angular/core';
import { AlertService } from '../../alert/alert.service';
import { Project, Task, TaskType, messages } from '@one-click/data';
import { CrudService } from '../../crud/crud.service';
import { CommonServiceService } from '../../common-service/common-service.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

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
        await this.crudService.add('project', project);
        this.alertService.success(messages.PROJECT_CREATE);
      } else {
        await this.crudService.update('project', project, project.id);
        this.alertService.success(messages.PROJECT_UPDATE);
      }
    }
    catch (e: any) {
      this.alertService.error(e.message);
    }
  }

  /* Get Project List */
  getProject() {
    return this.crudService.getDataWhereCompany('project');
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
          await this.crudService.softRemove('project', project, project.id);
          this.alertService.success(messages.DELETED);
        }
        catch (e: any) {
          this.alertService.error(e.message);
        }
      }
    })
  }

  getProjectQry(projectId: string): Observable<any> {
    const company_id = this.cookieService.get('company_id')
    return this.crudService.collection$('project', (req: any) => req.orderBy('updatedAt', 'desc').where("company_id", "==", company_id).where("id", "==", projectId).where("deleteFlag", "==", "N"))
  }

  getProjectData(projectId: string) {
    this.project$ = this.getProjectQry(projectId).subscribe((resp: Array<Project>) => {
      this.project.next(resp[0]);
      this.projectData = resp[0];
    })
  }

  createTaskObj(type: TaskType, description: string, project_id: string) {
    let task = new Task();
    task.id = this.crudService.angularFirestore.createId();
    task.taskType = type;
    task.description = description;
    task.icon = (type == TaskType.GROUP) ? "description" : "sticky_note_2";
    task.company_id = this.cookieService.get('company_id');
    task.project_id = project_id;
    return task;

  }

  createGroup(description: string, project_id: string) {
    let task = this.createTaskObj(TaskType.GROUP, description, project_id);
    this.createTask(task);
  }

  async createTask(task: Task) {
    try {
      await this.crudService.setRealTimeData(`task/${task.project_id}/${task.id}`, task);
      return;
    }
    catch (e: any) {
      this.alertService.error(e.message)
      throw e;
    }
  }

  getGroupList(project_id: string) {
    this.crudService.getContentRealTimeOrderByEqualTo(`task/${project_id}`, 'taskType', TaskType.GROUP).on('value', snapData => {
      /*  */
    })
  }

}
