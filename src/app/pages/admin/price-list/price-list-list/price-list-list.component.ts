import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { firstValueFrom, Subscription } from 'rxjs';
import { DeleteMultiplePriceListDtoDataReq } from 'src/app/dto/price-list/delete-multiple-price-list-dto-data-req';
import { DeleteMultiplePriceListDtoReq } from 'src/app/dto/price-list/delete-multiple-price-list-dto-req';
import { GetAllPriceListPageDtoDataRes } from 'src/app/dto/price-list/get-all-price-list-page-dto-data-res';
import { GetAllPriceListPageDtoRes } from 'src/app/dto/price-list/get-all-price-list-page-dto-res';
import { PriceListService } from 'src/app/service/price-list.service';

@Component({
  selector: 'app-price-list-list',
  templateUrl: './price-list-list.component.html',
  styleUrls: ['./price-list-list.component.scss'],
  providers: [ConfirmationService]
})
export class PriceListListComponent implements OnInit{

  priceList: GetAllPriceListPageDtoDataRes[]=[]
  priceListData : GetAllPriceListPageDtoRes
  deleteIds: string[]=[]
  deletePriceList: DeleteMultiplePriceListDtoReq = new DeleteMultiplePriceListDtoReq()

  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private router : Router, private priceListService : PriceListService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    if(event.globalFilter){
      this.filter(event.globalFilter)
    }else {
      this.getData(event.first, event.rows)
    }
  }

  filter(text : string) : void {
    this.priceList = this.priceList.filter(list=>list.priceName.includes(text))
  }

  async getData(startPage: number = 0, maxPage: number = this.maxPage): Promise<void> {
    this.loading = true;

    try {
      this.priceListData = await firstValueFrom(this.priceListService.getAll(startPage, maxPage))
      this.priceList = this.priceListData.data
      this.loading = false
      this.totalRecords = this.priceListData.total
    } catch(error){
      this.loading = false
    }
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

  async doDelete(): Promise<void> {
    const deleteData: DeleteMultiplePriceListDtoDataReq[] = []

    this.deleteIds.forEach(value => {
      const deletePositionId: DeleteMultiplePriceListDtoDataReq = new DeleteMultiplePriceListDtoDataReq()
      deletePositionId.id = value
      deleteData.push(deletePositionId)
    })

    this.deletePriceList.data = deleteData

    try {
      await firstValueFrom(this.priceListService.deleteMultiple(this.deletePriceList))
      this.getData()
    }
    catch(error) {

    }
  }
}
