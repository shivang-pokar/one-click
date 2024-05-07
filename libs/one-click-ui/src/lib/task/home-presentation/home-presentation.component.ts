import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@one-click/data';
import { CommonServiceService } from '@one-click/one-click-services';
import { Subject } from 'rxjs';

@Component({
  selector: 'one-click-home-presentation',
  templateUrl: './home-presentation.component.html',
  styleUrls: ['./home-presentation.component.scss'],
})
export class HomePresentationComponent implements OnInit, OnDestroy {

  currentDate = new Date();
  greeting: string;
  user: User;
  destory$: Subject<void> = new Subject<void>();

  constructor(
    public commonServiceService: CommonServiceService
  ) {

  }

  ngOnInit(): void {
    this.greeting = this.commonServiceService.getGreeting();
    this.commonServiceService.user.subscribe(user => {
      this.user = user;
    })
  }

  ngOnDestroy(): void {
    this.destory$.next()
    this.destory$.complete()
  }

}
