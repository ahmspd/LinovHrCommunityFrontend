import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { DeleteMultiplePriceTypeDtoDataReq } from 'src/app/dto/price-type/delete-multiple-price-type-dto-data-req';
import { DeleteMultiplePriceTypeDtoReq } from 'src/app/dto/price-type/delete-multiple-price-type-dto-req';
import { GetAllPriceTypePageDtoDataRes } from 'src/app/dto/price-type/get-all-price-type-page-dto-data-res';
import { GetAllPriceTypePageDtoRes } from 'src/app/dto/price-type/get-all-price-type-page-dto-res';
import { PriceTypeService } from 'src/app/service/price-type.service';

@Component({
  selector: 'app-price-type-list',
  templateUrl: './price-type-list.component.html',
  styleUrls: ['./price-type-list.component.scss'],
  providers: [ConfirmationService]
})
export class PriceTypeListComponent implements OnInit {

  priceTypes: GetAllPriceTypePageDtoDataRes[]=[]
  priceTypeData : GetAllPriceTypePageDtoRes

  deleteIds: string[]=[]

  deletePriceType: DeleteMultiplePriceTypeDtoReq = new DeleteMultiplePriceTypeDtoReq()

  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private router: Router, private confirmationService: ConfirmationService, private priceTypeService : PriceTypeService) { }

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
    this.priceTypes = this.priceTypes.filter(priceType=>priceType.priceTypeName.includes(text))
  }

  async getData(startPage: number = 0, maxPage: number = this.maxPage): Promise<void> {
    this.loading = true;
    try{
      this.priceTypeData = await firstValueFrom(this.priceTypeService.getAll(startPage, maxPage))
      this.priceTypes = this.priceTypeData.data
      this.loading = false
      this.totalRecords = this.priceTypeData.total 
    }
    catch(error){
      this.loading = false
    }
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

  async doDelete(): Promise<void> {
    const deleteData: DeleteMultiplePriceTypeDtoDataReq[] = []

    this.deleteIds.forEach(value => {
      const deleteIndustryId: DeleteMultiplePriceTypeDtoDataReq = new DeleteMultiplePriceTypeDtoDataReq()
      deleteIndustryId.id = value
      deleteData.push(deleteIndustryId)
    })

    this.deletePriceType.data = deleteData

    try {
      await firstValueFrom(this.priceTypeService.deleteMultiple(this.deletePriceType))
      this.getData()
    }catch(error){

    }
  }
}
