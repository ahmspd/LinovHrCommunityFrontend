import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DeleteMultiplePriceListDtoDataReq } from 'src/app/dto/price-list/delete-multiple-price-list-dto-data-req';
import { DeleteMultiplePriceListDtoReq } from 'src/app/dto/price-list/delete-multiple-price-list-dto-req';
import { GetAllPriceListPageDtoDataRes } from 'src/app/dto/price-list/get-all-price-list-page-dto-data-res';
import { PriceListService } from 'src/app/service/price-list.service';

@Component({
  selector: 'app-price-list-list',
  templateUrl: './price-list-list.component.html',
  styleUrls: ['./price-list-list.component.scss'],
  providers: [ConfirmationService]
})
export class PriceListListComponent implements OnInit , OnDestroy{

  priceList: GetAllPriceListPageDtoDataRes[]=[]
  deleteIds: string[]=[]
  deletePriceList: DeleteMultiplePriceListDtoReq = new DeleteMultiplePriceListDtoReq()

  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  priceListGetAllSubscription? : Subscription
  deleteMultipleSubscription? : Subscription
  constructor(private router : Router, private priceListService : PriceListService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    console.log(event)
    this.getData(event.first, event.rows)
  }

  getData(startPage: number = 0, maxPage: number = this.maxPage): void {
    this.loading = true;

    this.priceListGetAllSubscription = this.priceListService.getAll(startPage, maxPage).subscribe({
      next: result => {
        const resultData: any = result
        this.priceList = resultData.data
        this.loading = false
        this.totalRecords = resultData.total
      },
      error: _ => this.loading = false
    })
  }

  update(id: string): void {
    this.router.navigateByUrl(`/price-list/${id}`)
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
    const deleteData: DeleteMultiplePriceListDtoDataReq[] = []

    this.deleteIds.forEach(value => {
      const deletePositionId: DeleteMultiplePriceListDtoDataReq = new DeleteMultiplePriceListDtoDataReq()
      deletePositionId.id = value
      deleteData.push(deletePositionId)
    })

    this.deletePriceList.data = deleteData
    this.deleteMultipleSubscription = this.priceListService.deleteMultiple(this.deletePriceList).subscribe(result => {
      this.getData()
    })
  }

  ngOnDestroy(): void {
    this.priceListGetAllSubscription?.unsubscribe()
    this.deleteMultipleSubscription?.unsubscribe()
  }
}
