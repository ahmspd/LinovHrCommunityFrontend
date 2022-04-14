import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { InsertPriceListDtoReq } from 'src/app/dto/price-list/insert-price-list-dto-req';
import { InsertPriceListDtoRes } from 'src/app/dto/price-list/insert-price-list-dto-res';
import { GetAllPriceTypeDtoRes } from 'src/app/dto/price-type/get-all-price-type-dto-res';
import { GetAllPriceTypePageDtoDataRes } from 'src/app/dto/price-type/get-all-price-type-page-dto-data-res';
import { PriceListService } from 'src/app/service/price-list.service';
import { PriceTypeService } from 'src/app/service/price-type.service';

@Component({
  selector: 'app-price-list-new',
  templateUrl: './price-list-new.component.html',
  styleUrls: ['./price-list-new.component.scss']
})
export class PriceListNewComponent implements OnInit{

  priceList: InsertPriceListDtoReq = new InsertPriceListDtoReq()
  priceListData : InsertPriceListDtoRes

  priceType: GetAllPriceTypePageDtoDataRes[]=[]
  priceTypeData : GetAllPriceTypeDtoRes

  constructor(private router: Router, private priceTypeService : PriceTypeService, private priceListService: PriceListService) { }

  ngOnInit(): void {
    this.getDataPriceType()
  }

  async getDataPriceType() : Promise<void>{
    this.priceTypeData = await firstValueFrom(this.priceTypeService.getAllPriceType())
    this.priceType = this.priceTypeData.data
  }

  async insert(isValid: boolean) : Promise<void> {
    if(isValid) {
      this.priceListData = await firstValueFrom(this.priceListService.insert(this.priceList))
      if(this.priceListData.data){
        this.router.navigateByUrl('/price-list/list')
      }
    }
  }

}
