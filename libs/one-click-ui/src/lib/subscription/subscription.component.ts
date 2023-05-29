import { Component } from '@angular/core';
import { CrudService } from '@one-click/one-click-services';
import { StripeService } from 'ngx-stripe';
import { switchMap } from 'rxjs';

@Component({
  selector: 'one-click-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent {

  isloading: boolean = false;

  constructor(
    public crudService: CrudService,
    private stripeService: StripeService,
  ) {

  }

  checkout() {
    this.crudService.stripeCheckout()
      .pipe(switchMap((session: any) => {
        console.log(session)
        return this.stripeService.redirectToCheckout({ sessionId: session.sessionId })
      }))
      .subscribe(result => {
        console.log(result)
        if (result.error) {
          alert(result.error.message);
        }
      })
  }

  stripeSession(date: string) {
    this.crudService.stripeSession(date).subscribe(resp => {
      console.log(resp)
    })
  }
}
