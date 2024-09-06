import { Injectable } from '@angular/core';
import { AlertService } from '../../alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class StatusMenuService {

  constructor(
    private alertService: AlertService
  ) { }

  openEditStatus(type: string = 'status') {
    this.alertService.openEditStatus(type);
  }
}
