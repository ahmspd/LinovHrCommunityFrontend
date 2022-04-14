import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { InsertPaymentMethodDtoReq } from 'src/app/dto/payment-method/insert-payment-method-dto-req';
import { InsertPaymentMethodDtoRes } from 'src/app/dto/payment-method/insert-payment-method-dto-res';
import { PaymentMethodService } from 'src/app/service/payment-method.service';

@Component({
  selector: 'app-payment-method-save',
  templateUrl: './payment-method-save.component.html',
  styleUrls: ['./payment-method-save.component.scss'],
  providers: [ConfirmationService]
})
export class PaymentMethodSaveComponent implements OnInit{

  paymentMethod : InsertPaymentMethodDtoReq = new InsertPaymentMethodDtoReq()
  patmentMethodData : InsertPaymentMethodDtoRes

  constructor(private paymentMethodService: PaymentMethodService, private router: Router, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

 async insert(isValid : boolean) : Promise<void> {
    if(isValid){
      this.patmentMethodData = await firstValueFrom(this.paymentMethodService.insert(this.paymentMethod))
      if(this.patmentMethodData.data){
        this.router.navigateByUrl(`/payment-method/list`)
      }
    }
  }

}
