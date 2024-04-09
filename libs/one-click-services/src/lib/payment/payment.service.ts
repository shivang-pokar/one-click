import { Injectable } from '@angular/core';
import { CommonServiceService } from '../common-service/common-service.service';
import { CrudService } from '../crud/crud.service';
import { CookieService } from 'ngx-cookie-service';
import { switchMap } from 'rxjs';
import { StripeService } from 'ngx-stripe';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    public commonServiceService: CommonServiceService,
    public crudService: CrudService,
    public cookieService: CookieService,
    private stripeService: StripeService,
  ) { }

  async createCustomer(email: string, name: string, id: string) {
    let customer: any = await this.crudService.createCustomer(email, name, id).toPromise();
    this.commonServiceService.companyData.stripe_customer_id = customer.id;
    await this.commonServiceService.updateCompnay(this.commonServiceService.companyData);
    return;
  }


  async subscription(email: string, name: string, id: string, couponCode: string = "") {
    let customerId = await this.getCustomerId(email, name, id);
    this.subscribePackage(customerId, couponCode);
  }

  async getCustomerId(email: string, name: string, id: string) {
    if (!this.commonServiceService.companyData.stripe_customer_id) {
      await this.createCustomer(email, name, id);
    }
    return this.commonServiceService.companyData.stripe_customer_id;
  }


  subscribePackage(customerId: string, couponCode: string = "") {
    this.crudService.stripeCheckout(customerId, couponCode).pipe(switchMap((session: any) => {
      return this.stripeService.redirectToCheckout({ sessionId: session.sessionId })
    })).subscribe(result => {
      console.log(result)
      if (result.error) {
        alert(result.error.message);
      }
    })
  }

}
