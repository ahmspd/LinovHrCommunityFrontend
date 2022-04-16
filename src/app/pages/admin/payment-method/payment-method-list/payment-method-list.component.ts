import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { DeleteMultiplePaymentMethodDtoDataReq } from 'src/app/dto/payment-method/delete-multiple-payment-method-dto-data-req';
import { DeleteMultiplePaymentMethodDtoReq } from 'src/app/dto/payment-method/delete-multiple-payment-method-dto-req';
import { GetAllPaymentMethodDtoDataRes } from 'src/app/dto/payment-method/get-all-payment-method-dto-data-res';
import { GetAllPaymentMethodPageDtoRes } from 'src/app/dto/payment-method/get-all-payment-method-page-dto-res';
import { PaymentMethodService } from 'src/app/service/payment-method.service';

@Component({
  selector: 'app-payment-method-list',
  templateUrl: './payment-method-list.component.html',
  styleUrls: ['./payment-method-list.component.scss'],
  providers: [ConfirmationService]
})
export class PaymentMethodListComponent implements OnInit{

  constructor(private paymentMethodService : PaymentMethodService, private router: Router, private confirmationService: ConfirmationService) { }

  paymentMethodData?: GetAllPaymentMethodDtoDataRes[]=[]
  paymentMethodGetAll : GetAllPaymentMethodPageDtoRes

  deleteIds: string[] = []
  deleteMultiple: DeleteMultiplePaymentMethodDtoReq = new DeleteMultiplePaymentMethodDtoReq()

  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    if(event.globalFilter){
      this.filter(event.globalFilter)
    }else {
      this.getData(event.first, event.rows)
    }
  }

  filter(text: string):void{
    this.paymentMethodData = this.paymentMethodData.filter(paymentMethod=>paymentMethod.paymentName.includes(text))
  }

  async getData(startPage: number = 0, maxPage: number = this.maxPage): Promise<void> {
    this.loading = true;

    try {
      this.paymentMethodGetAll = await firstValueFrom(this.paymentMethodService.getAll(startPage, maxPage))
      this.paymentMethodData = this.paymentMethodGetAll.data
      this.loading = false
      this.totalRecords = this.paymentMethodGetAll.total
      
    } catch (error) {
      this.loading = false
    }
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

  async doDelete(): Promise<void> {
    const deleteData: DeleteMultiplePaymentMethodDtoDataReq[] = []

    this.deleteIds.forEach(value => {
      const deleteIndustryId: DeleteMultiplePaymentMethodDtoDataReq = new DeleteMultiplePaymentMethodDtoDataReq()
      deleteIndustryId.id = value
      deleteData.push(deleteIndustryId)
    })

    this.deleteMultiple.data = deleteData

    try {
      await firstValueFrom(this.paymentMethodService.deleteMultiple(this.deleteMultiple))
      this.getData()
    } catch (error) {
      
    }
  }

  update(id: string): void {
    this.router.navigateByUrl(`/payment-method/${id}`)
  }
}
