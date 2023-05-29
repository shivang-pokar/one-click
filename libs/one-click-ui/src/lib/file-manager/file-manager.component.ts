import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AlertService, CrudService } from '@one-click/one-click-services';
import { FileItem, FileManager } from '@one-click/data';
import { take } from 'rxjs';

@Component({
  selector: 'one-click-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss']
})
export class FileManagerComponent implements OnInit {

  menuList = [
    /* {
      text: 'Upload File',
      icon: 'cloud_upload'
    }, */
    {
      text: 'Uploaded Files',
      icon: 'folder'
    }
  ];

  isLoading: boolean = false;
  selectedIndex: number = 0;
  company_id = this.cookieService.get('company_id');
  fileManagerCol: string = 'fileManager';
  fileManager: FileManager;
  selectImages: Array<FileItem> = [];

  constructor(
    private cookieService: CookieService,
    private crudService: CrudService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.crudService.collection$(this.fileManagerCol, (qry: any) => { return qry.where('company_id', '==', this.company_id) }).pipe(take(1)).subscribe((resp: Array<FileManager>) => {
      this.fileManager = resp[0];
      if (!this.fileManager) {
        this.fileManager = new FileManager();
        this.fileManager.company_id = this.company_id;
      }
    })
  }

  uploadFiles(event: any) {
    this.isLoading = true;
    this.crudService.fileUploadService(this.company_id, event).then((resp: any) => {
      this.updateFiles(resp);
      this.selectImages.push(...resp);
    }, er => {
      this.isLoading = false;
    })
  }

  async updateFiles(files?: any) {
    if (files) {
      this.fileManager.fileList?.push(...files);
    }
    try {
      if (!this.fileManager.id) {
        await this.crudService.add(this.fileManagerCol, this.fileManager);
      } else {
        await this.crudService.update(this.fileManagerCol, this.fileManager, this.fileManager.id);
      }
      if (files) {
        this.alertService.success("Files uploaded successfully");
      } else {
        this.alertService.success("File remove successfully");
      }
      this.isLoading = false;
    } catch (e: any) {
      this.isLoading = false;
      this.alertService.error(e.message);
    }
  }

  selectItem(file: FileItem) {
    let sameTypeListIndex = this.selectImages.findIndex(slectedFile => slectedFile.type == file.type);
    if (sameTypeListIndex == -1) {
      this.selectImages = [];
    }

    let index = this.selectImages.findIndex(item => item.id == file.id);
    if (index == -1) {
      this.selectImages.push(file)
    } else {
      this.selectImages = this.selectImages.filter(item => item.id != file.id);
    }
  }

  isImageSelected(file: FileItem): boolean {
    let index = this.selectImages.findIndex(slectedFile => slectedFile.id == file.id);
    if (index != -1) {
      return true;
    }
    return false;
  }

  deleteFile(file: FileItem) {
    this.alertService.confirmationDialog('Are you sure you want to delete?').afterClosed().subscribe(resp => {
      if (resp) {
        this.selectImages = this.selectImages.filter(item => item.id != file.id);
        this.fileManager.fileList = this.fileManager.fileList?.filter(item => item.id != file.id);
        this.updateFiles();
      }
    })
  }

}
