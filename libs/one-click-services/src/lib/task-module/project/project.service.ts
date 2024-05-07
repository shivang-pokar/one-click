import { Injectable } from '@angular/core';
import { AlertService } from '../../alert/alert.service';
import { Project, messages } from '@one-click/data';
import { CrudService } from '../../crud/crud.service';
import { CommonServiceService } from '../../common-service/common-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    public alertService: AlertService,
    public crudService: CrudService,
    public commonServiceService: CommonServiceService
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

}
