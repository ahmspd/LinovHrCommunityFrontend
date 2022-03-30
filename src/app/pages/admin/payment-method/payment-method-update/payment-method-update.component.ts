import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UpdatePaymentMethodDtoReq } from 'src/app/dto/payment-method/update-payment-method-dto-req';
import { PaymentMethodService } from 'src/app/service/payment-method.service';

@Component({
  selector: 'app-payment-method-update',
  templateUrl: './payment-method-update.component.html',
  styleUrls: ['./payment-method-update.component.scss']
})
export class PaymentMethodUpdateComponent implements OnInit , OnDestroy{

  paymentMethod: UpdatePaymentMethodDtoReq = new UpdatePaymentMethodDtoReq()

  paymentMethodSubsGetById?: Subscription
  paymentMethodSubsUpdate?: Subscription
  activateRouteSubscription? : Subscription

  constructor(private paymentMethodService : PaymentMethodService, private activatedRoute: ActivatedRoute, private router: Router) { }



  ngOnInit(): void {
    this.activateRouteSubscription = this.activatedRoute.params.subscribe(result => {
      const id: string = (result as any).id
      this.paymentMethodSubsGetById = this.paymentMethodService.getById(id).subscribe(result=>{
        this.paymentMethod = result.data
      })
    })
  }

  update(isValid: boolean):void {
    if(isValid){
      this.paymentMethodSubsUpdate = this.paymentMethodService.update(this.paymentMethod).subscribe(result => {
        this.router.navigateByUrl('/payment-method/list')
      })
    }
  }

  ngOnDestroy(): void {
    this.paymentMethodSubsUpdate?.unsubscribe()
    this.paymentMethodSubsGetById?.unsubscribe()
    this.activateRouteSubscription?.unsubscribe()
  }
}
