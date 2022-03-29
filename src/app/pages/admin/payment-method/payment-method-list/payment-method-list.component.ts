import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DeleteMultiplePaymentMethodDtoDataReq } from 'src/app/dto/payment-method/delete-multiple-payment-method-dto-data-req';
import { DeleteMultiplePaymentMethodDtoReq } from 'src/app/dto/payment-method/delete-multiple-payment-method-dto-req';
import { GetAllPaymentMethodDtoDataRes } from 'src/app/dto/payment-method/get-all-payment-method-dto-data-res';
import { PaymentMethodService } from 'src/app/service/payment-method.service';

@Component({
  selector: 'app-payment-method-list',
  templateUrl: './payment-method-list.component.html',
  styleUrls: ['./payment-method-list.component.scss'],
  providers: [ConfirmationService]
})
export class PaymentMethodListComponent implements OnInit , OnDestroy{

  constructor(private paymentMethodService : PaymentMethodService, private router: Router, private confirmationService: ConfirmationService) { }

  paymentMethodData?: GetAllPaymentMethodDtoDataRes[]=[]
  deleteIds: string[] = []
  deleteMultiple: DeleteMultiplePaymentMethodDtoReq = new DeleteMultiplePaymentMethodDtoReq()
  paymentMethodSubsGetAll?: Subscription
  paymentMethodSubsDeleteMultiple?: Subscription


  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    console.log(event)
    this.getData(event.first, event.rows)
  }

  getData(startPage: number = 0, maxPage: number = this.maxPage): void {
    this.loading = true;

    this.paymentMethodSubsGetAll = this.paymentMethodService.getAll(startPage, maxPage).subscribe({
      next: result => {
        const resultData: any = result
        this.paymentMethodData = resultData.data
        this.loading = false
        this.totalRecords = resultData.total
      },
      error: _ => this.loading = false
    })
  }

  confirm(): void {
    this.confirmationService.confirm({
      key: 'confirm',
      message: 'Are you sure to delete these data?',
      accept: () => {
        this.doDelete()
      },
      reject: () => {
        this.getData()
      }
    });
  }

  doDelete(): void {
    const deleteData: DeleteMultiplePaymentMethodDtoDataReq[] = []

    this.deleteIds.forEach(value => {
      const deleteIndustryId: DeleteMultiplePaymentMethodDtoDataReq = new DeleteMultiplePaymentMethodDtoDataReq()
      deleteIndustryId.id = value
      deleteData.push(deleteIndustryId)
    })

    this.deleteMultiple.data = deleteData
    this.paymentMethodSubsDeleteMultiple = this.paymentMethodService.deleteMultiple(this.deleteMultiple).subscribe(result => {
      if(result){
        this.getData()
      }
    })
  }

  update(id: string): void {
    this.router.navigateByUrl(`/payment-method/${id}`)
  }

  ngOnDestroy(): void {
    this.paymentMethodSubsGetAll?.unsubscribe()
    this.paymentMethodSubsDeleteMultiple?.unsubscribe()
  }
}
