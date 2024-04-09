import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Integration, PostContainer } from '@one-click/data';
import { CalendarService, CommonServiceService, CrudService } from '@one-click/one-click-services';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';

@Component({
  selector: 'one-click-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewInit {

  postListMapObj: any = {};
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    height: "100%",
    initialView: 'dayGridMonth',
    weekends: true,
    events: [],

  };

  calendar: Calendar;

  postObjectInMap: any = {};
  integration: Integration;

  constructor(
    public crudService: CrudService,
    public commonServiceService: CommonServiceService,
    public cookieService: CookieService,
    public calendarService: CalendarService
  ) {

  }

  ngOnInit(): void {
    this.commonServiceService.integration.subscribe(integration => {
      if (integration) {
        this.integration = integration;
      }
    });
  }

  ngAfterViewInit(): void {
    this.calendar = this.calendarComponent.getApi();
    this.getselectedMonthData();
  }

  async getselectedMonthData() {
    const { postList, event } = await this.calendarService.getSelectedMonthPostList(String(this.calendar.getDate()));
    this.postListMapObj = this.commonServiceService.convertArrayToMapObj(postList);
    this.calendarOptions.events = event;
  }

}
