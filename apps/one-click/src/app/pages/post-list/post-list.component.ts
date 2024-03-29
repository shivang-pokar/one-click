import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Integration, messages, PostContainer, PostContent } from '@one-click/data';
import { AlertService, CommonServiceService, CrudService } from '@one-click/one-click-services';
import { CookieService } from 'ngx-cookie-service';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'one-click-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  collName = "postContainer";
  company_id = this.cookieService.get('company_id');
  destory$: Subject<void> = new Subject<void>();
  postList: Array<PostContainer> = [];
  integration: Integration;
  filterStatus: string = "SUCESS";
  statusList: Array<any> = [
    {
      value: "SUCESS",
      label: 'Posted'
    },
    {
      value: "DRAFT",
      label: 'Draft'
    },
    {
      value: "SCHEDULE",
      label: 'Scheduled'
    },
    {
      value: "FAIL",
      label: 'Failed'
    }
  ]

  constructor(
    public crudService: CrudService,
    private cookieService: CookieService,
    private commonServiceService: CommonServiceService,
    private alertService: AlertService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.commonServiceService.integration.subscribe(integration => {
      if (integration) {
        this.integration = integration;
      }
    });
    this.getData();
  }

  getData(endBefore: any = new Date().getTime()) {
    this.crudService.collection$(this.collName, (qry: any) => { return qry.where('company_id', '==', this.company_id).where('deleteFlag', '==', "N").where('status', '==', this.filterStatus).orderBy("createdAt").endBefore(endBefore).limit(10) }).pipe(take(1), takeUntil(this.destory$)).subscribe((resp: Array<PostContainer>) => {
      this.postList = resp;
      this.postList?.forEach(item => {
        item.keyIndex = 0;
      });
    });
  }

  delete(post: PostContainer) {
    this.alertService.confirmationDialog(messages.ARE_YOU_SURE_DELETE).afterClosed().subscribe(async resp => {
      if (resp) {
        if (post.status == 'SCHEDULE') {
          this.crudService.cancelSchedule(post).toPromise();
        }
        await this.crudService.softRemove(this.collName, post, post.id)
        this.postList = this.postList.filter(item => item.id != post.id);
        this.alertService.success(messages.DETAILS_UPDATED);
      }
    });
  }

  goToReport(report: PostContainer) {
    this.router.navigateByUrl(`post-report/${report.id}`);
  }
}
