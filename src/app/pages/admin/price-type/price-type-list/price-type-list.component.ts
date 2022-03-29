import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DeleteMultipleIndustryDtoReq } from 'src/app/dto/industry/delete-multiple-industry-dto-req';
import { GetAllPaymentMethodPageDtoDataRes } from 'src/app/dto/payment-method/get-all-payment-method-page-dto-data-res';
import { DeleteMultiplePriceTypeDtoDataReq } from 'src/app/dto/price-type/delete-multiple-price-type-dto-data-req';
import { DeleteMultiplePriceTypeDtoReq } from 'src/app/dto/price-type/delete-multiple-price-type-dto-req';
import { GetAllPriceTypePageDtoDataRes } from 'src/app/dto/price-type/get-all-price-type-page-dto-data-res';
import { PriceTypeService } from 'src/app/service/price-type.service';

@Component({
  selector: 'app-price-type-list',
  templateUrl: './price-type-list.component.html',
  styleUrls: ['./price-type-list.component.scss'],
  providers: [ConfirmationService]
})
export class PriceTypeListComponent implements OnInit , OnDestroy{

  priceTypes: GetAllPriceTypePageDtoDataRes[]=[]
  deleteIds: string[]=[]

  deletePriceType: DeleteMultiplePriceTypeDtoReq = new DeleteMultiplePriceTypeDtoReq()
  priceTypeGetAll? : Subscription
  priceTypeDeleteMultipleSubscription? : Subscription
  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private router: Router, private confirmationService: ConfirmationService, private priceTypeService : PriceTypeService) { }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    console.log(event)
    this.getData(event.first, event.rows)
  }

  getData(startPage: number = 0, maxPage: number = this.maxPage): void {
    this.loading = true;

    this.priceTypeGetAll = this.priceTypeService.getAll(startPage, maxPage).subscribe({
      next: result => {
        const resultData: any = result
        this.priceTypes = resultData.data
        this.loading = false
        this.totalRecords = resultData.total
      },
      error: _ => this.loading = false
    })
  }

  update(id: string): void {
    this.router.navigateByUrl(`/price-type/${id}`)
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
    const deleteData: DeleteMultiplePriceTypeDtoDataReq[] = []

    this.deleteIds.forEach(value => {
      const deleteIndustryId: DeleteMultiplePriceTypeDtoDataReq = new DeleteMultiplePriceTypeDtoDataReq()
      deleteIndustryId.id = value
      deleteData.push(deleteIndustryId)
    })

    this.deletePriceType.data = deleteData
    this.priceTypeDeleteMultipleSubscription = this.priceTypeService.deleteMultiple(this.deletePriceType).subscribe(result => {
      this.getData()
    })
  }

  ngOnDestroy(): void {
    this.priceTypeGetAll?.unsubscribe()
    this.priceTypeDeleteMultipleSubscription?.unsubscribe()
  }
}
