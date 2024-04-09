import { Injectable } from '@angular/core';
import { CommonServiceService } from '../common-service/common-service.service';
import { CrudService } from '../crud/crud.service';
import { take } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { PostContainer } from '@one-click/data';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  company_id = this.cookieService.get('company_id');

  constructor(
    public commonServiceService: CommonServiceService,
    public crudService: CrudService,
    public cookieService: CookieService
  ) { }

  getselectedMonthData(selectedMonthDate: string): Promise<Array<PostContainer>> {
    const { firstDay, lastDay } = this.getSelectedMonthFirstAndLastDate(selectedMonthDate);
    return this.crudService.collection$('postContainer', (qry: any) => { return qry.where('company_id', '==', this.company_id).where('deleteFlag', '==', "N").orderBy("createdAt").startAfter(firstDay).endBefore(lastDay) }).pipe(take(1)).toPromise()
  }

  getSelectedMonthFirstAndLastDate(selectedMonthDate: string) {
    var date = new Date(selectedMonthDate),
      y = date.getFullYear(),
      m = date.getMonth();
    var firstDay = new Date(y, m, 1).getTime();
    var lastDay = new Date(y, m + 1, 0).getTime();
    return { firstDay, lastDay };
  }

  async getSelectedMonthPostList(selectedMonthDate: string) {
    let postList = await this.getselectedMonthData(selectedMonthDate);
    let event: any = [];
    postList.forEach(post => {
      event.push({
        title: post.postContent[0].message,
        start: (post?.postDate) ? new Date(post.postDate) : new Date(post.createdAt),
        id: post.id
      })
    })
    return { postList, event };
  }

}
