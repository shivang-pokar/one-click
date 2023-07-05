import { Injectable } from '@angular/core';
import { CrudService } from '../crud/crud.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivityLogs } from '@one-click/data';



@Injectable({
  providedIn: 'root'
})
export class ActivityLogsService {

  constructor(
    public crudService: CrudService,
    private cookieService: CookieService,
  ) { }

  

}
