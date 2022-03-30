import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { InsertPaymentMethodDtoReq } from 'src/app/dto/payment-method/insert-payment-method-dto-req';
import { PaymentMethodService } from 'src/app/service/payment-method.service';

@Component({
  selector: 'app-payment-method-save',
  templateUrl: './payment-method-save.component.html',
  styleUrls: ['./payment-method-save.component.scss'],
  providers: [ConfirmationService]
})
export class PaymentMethodSaveComponent implements OnInit , OnDestroy{

  paymentMethod : InsertPaymentMethodDtoReq = new InsertPaymentMethodDtoReq()
  
  saveSubscription? : Subscription

  constructor(private paymentMethodService: PaymentMethodService, private router: Router, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

  insert(isValid : boolean) {
    if(isValid){
      this.saveSubscription = this.paymentMethodService.insert(this.paymentMethod).subscribe(result=>{
        this.router.navigateByUrl('/payment-method/list')
      })
    }
  }

  ngOnDestroy(): void {
    this.saveSubscription?.unsubscribe()
  }
}
