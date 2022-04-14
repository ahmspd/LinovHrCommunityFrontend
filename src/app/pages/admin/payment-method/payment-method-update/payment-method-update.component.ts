import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map, Subscription } from 'rxjs';
import { GetByIdPaymentMethodDtoRes } from 'src/app/dto/payment-method/get-by-id-payment-method-dto-res';
import { UpdatePaymentMethodDtoReq } from 'src/app/dto/payment-method/update-payment-method-dto-req';
import { UpdatePaymentMethodDtoRes } from 'src/app/dto/payment-method/update-payment-method-dto-res';
import { PaymentMethodService } from 'src/app/service/payment-method.service';

@Component({
  selector: 'app-payment-method-update',
  templateUrl: './payment-method-update.component.html',
  styleUrls: ['./payment-method-update.component.scss']
})
export class PaymentMethodUpdateComponent implements OnInit{

  paymentMethod: UpdatePaymentMethodDtoReq = new UpdatePaymentMethodDtoReq()
  paymentMethodData : GetByIdPaymentMethodDtoRes
  updatePaymentMethod : UpdatePaymentMethodDtoRes

  idPaymentMethod : string

  constructor(private paymentMethodService : PaymentMethodService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getData()
  }

  async getData(): Promise<void>{
    const result = await firstValueFrom(this.activatedRoute.params.pipe(map(result=>result)))
    this.idPaymentMethod = (result as any).id
    this.paymentMethodData = await firstValueFrom(this.paymentMethodService.getById(this.idPaymentMethod))
    this.paymentMethod = this.paymentMethodData.data
  }

  async update(isValid: boolean): Promise<void> {
    if(isValid){
      this.updatePaymentMethod = await firstValueFrom(this.paymentMethodService.update(this.paymentMethod))
      if(this.updatePaymentMethod.data){
        this.router.navigateByUrl('/payment-method/list')
      }
    }
  }

}
