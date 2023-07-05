import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Integration, PostContainer, PostContent } from '@one-click/data';
import { CommonServiceService, CrudService } from '@one-click/one-click-services';
import { CookieService } from 'ngx-cookie-service';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'one-click-post-report',
  templateUrl: './post-report.component.html',
  styleUrls: ['./post-report.component.scss'],
})
export class PostReportComponent implements OnInit, OnDestroy {

  collName: string = "postContainer";
  company_id = this.cookieService.get('company_id');
  post: PostContainer;
  id: string;
  destory$: Subject<void> = new Subject<void>();
  integration: Integration;


  constructor(
    public crudService: CrudService,
    private cookieService: CookieService,
    private activatedRoute: ActivatedRoute,
    private commonServiceService: CommonServiceService,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async ngOnInit() {

    this.commonServiceService.integration.subscribe(integration => {
      if (integration) {
        this.integration = integration;
      }
    });



    this.crudService.collection$(this.collName, (qry: any) => { return qry.where('company_id', '==', this.company_id).where('deleteFlag', '==', "N").where('id', '==', this.id) }).pipe(takeUntil(this.destory$)).subscribe(resp => {
      this.post = resp[0];

      this.post.postContent.forEach(post => {
        if (post.type == 'FACEBOOK') {
          this.getFbReport(post);
        }
        if (post.type == 'INSTAGRAM') {
          this.getReportInsta(post);
        }
      });
    })
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

  getReportInsta(postContent: PostContent) {
    this.crudService.getInstagramReport(postContent).subscribe(resp => {
      console.log(resp);
    })

  }

  getFbReport(postContent: PostContent) {
    this.crudService.getFbReport(postContent).subscribe(resp => {
      console.log(resp);
    })
  }


}
