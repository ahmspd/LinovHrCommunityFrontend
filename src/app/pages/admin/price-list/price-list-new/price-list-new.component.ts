import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InsertPriceListDtoReq } from 'src/app/dto/price-list/insert-price-list-dto-req';
import { GetAllPriceTypePageDtoDataRes } from 'src/app/dto/price-type/get-all-price-type-page-dto-data-res';
import { PriceListService } from 'src/app/service/price-list.service';
import { PriceTypeService } from 'src/app/service/price-type.service';

@Component({
  selector: 'app-price-list-new',
  templateUrl: './price-list-new.component.html',
  styleUrls: ['./price-list-new.component.scss']
})
export class PriceListNewComponent implements OnInit , OnDestroy{

  priceList: InsertPriceListDtoReq = new InsertPriceListDtoReq()

  priceType: GetAllPriceTypePageDtoDataRes[]=[]

  getAllPriceTypeSubscription? : Subscription
  insertPriceListSubscription? : Subscription
  constructor(private router: Router, private priceTypeService : PriceTypeService, private priceListService: PriceListService) { }

  ngOnInit(): void {
    this.getAllPriceTypeSubscription = this.priceTypeService.getAllPriceType().subscribe(result => {
      this.priceType = result.data
    })
  }

  insert(isValid: boolean) {
    if(isValid) {
      this.insertPriceListSubscription = this.priceListService.insert(this.priceList).subscribe(result => {
        this.router.navigateByUrl('/price-list/list')
      })
    }
  }

  ngOnDestroy(): void {
    this.getAllPriceTypeSubscription?.unsubscribe()
    this.insertPriceListSubscription?.unsubscribe()
  }
}
