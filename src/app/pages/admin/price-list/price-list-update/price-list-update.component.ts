import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';
import { GetByIdPriceListDtoRes } from 'src/app/dto/price-list/get-by-id-price-list-dto-res';
import { UpdatePriceListDtoReq } from 'src/app/dto/price-list/update-price-list-dto-req';
import { UpdatePriceListDtoRes } from 'src/app/dto/price-list/update-price-list-dto-res';
import { GetAllPriceTypeDtoRes } from 'src/app/dto/price-type/get-all-price-type-dto-res';
import { GetAllPriceTypePageDtoDataRes } from 'src/app/dto/price-type/get-all-price-type-page-dto-data-res';
import { PriceListService } from 'src/app/service/price-list.service';
import { PriceTypeService } from 'src/app/service/price-type.service';

@Component({
  selector: 'app-price-list-update',
  templateUrl: './price-list-update.component.html',
  styleUrls: ['./price-list-update.component.scss']
})
export class PriceListUpdateComponent implements OnInit{

  priceList : UpdatePriceListDtoReq = new UpdatePriceListDtoReq()
  priceListData : GetByIdPriceListDtoRes
  priceListUpdate : UpdatePriceListDtoRes

  priceType: GetAllPriceTypePageDtoDataRes[]=[]
  priceTypeData : GetAllPriceTypeDtoRes

  idPriceList : string

  constructor(private activatedRoute : ActivatedRoute, private router : Router, private priceListService : PriceListService,private priceTypeService : PriceTypeService) { }


  ngOnInit(): void {
    this.getData()
  }

  async getData(): Promise<void>{
    const result = await firstValueFrom(this.activatedRoute.params.pipe(map(result=>result)))
    this.idPriceList = (result as any).id
    this.priceListData = await firstValueFrom(this.priceListService.getById(this.idPriceList))
    this.priceList = this.priceListData.data
    this.priceTypeData = await firstValueFrom(this.priceTypeService.getAllPriceType())
    this.priceType = this.priceTypeData.data
  }

  async update(isValid: boolean): Promise<void> {
    if(isValid){
      this.priceListUpdate = await firstValueFrom(this.priceListService.update(this.priceList))
      if(this.priceListUpdate.data){
        this.router.navigateByUrl('/price-list/list');
      }
    }
  }
}
