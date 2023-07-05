import { Component, OnInit } from '@angular/core';
import { Company, messages } from '@one-click/data';
import { AlertService, CommonServiceService, CrudService } from '@one-click/one-click-services';
import { StripeService } from 'ngx-stripe';
import { switchMap } from 'rxjs';

@Component({
  selector: 'one-click-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent implements OnInit {

  isloading: boolean = false;
  isSubscriptionActive: boolean = true;
  company: Company;
  couponCode: string;
  couponCodeResp: any;
  packageAmount: number = 10;
  packageAmountInit: number = 10;
  /* plansData: Array<any> = []; */

  constructor(
    public crudService: CrudService,
    public commonServiceService: CommonServiceService,
    private stripeService: StripeService,
    private alertService: AlertService,
  ) {

  }

  ngOnInit(): void {
    this.commonServiceService.company.subscribe(company => {
      this.company = company;
      let diff = this.commonServiceService.diffTime(new Date().getTime(), company?.stripe_expires_at) || 1;

      if (diff > 0 || this.company.status == 'CANCELED') {
        this.isSubscriptionActive = false;
      } else {
        this.isSubscriptionActive = true;
      }

    });

    /* this.commonServiceService.getSubscriptionPlans().then((resp: any) => {
      this.plansData = resp;
    }) */
  }

  checkout() {

    this.crudService.stripeCheckout((this.couponCodeResp) ? this.couponCode : '')
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

  cancelSubscription() {
    this.alertService.confirmationDialog(messages.SUBSCRIPTION_CANCELLED_CONFIRM).afterClosed().subscribe(resp => {
      if (resp) {
        this.crudService.cancelSubscription(this.company?.stripe_subscription_id).subscribe(resp => {
          this.alertService.success(messages.SUBSCRIPTION_CANCELLED)
        }, er => {
          if (er.status) {
            this.alertService.error(messages.ALREADY_CANCELLED);
          }
        })
      }
    })
  }

  resumeSubscription() {
    this.crudService.resumeSubscription(this.company?.stripe_subscription_id).subscribe(resp => {
      console.log(resp)
    })
  }

  validateCoupon() {
    if (this.couponCode) {
      this.crudService.validateCoupon(this.couponCode).subscribe((resp: any) => {
        if (resp.valid) {
          this.couponCodeResp = resp;
          let offAmount = this.commonServiceService.stripePercentOffAmount(this.couponCodeResp.percent_off, this.packageAmount);
          this.packageAmount = this.packageAmount - offAmount;
          this.alertService.success(messages.COUPON_SUCESS);
        } else {
          this.alertService.success(messages.COUPON_FAIL);
        }
      }, er => {
        this.alertService.error(er.error.message);
      })
    }
  }

  removeCoupon() {
    this.couponCodeResp = null;
    this.packageAmount = this.packageAmountInit;
  }

}
