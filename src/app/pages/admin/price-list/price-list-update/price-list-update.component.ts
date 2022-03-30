import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UpdatePriceListDtoReq } from 'src/app/dto/price-list/update-price-list-dto-req';
import { GetAllPriceTypePageDtoDataRes } from 'src/app/dto/price-type/get-all-price-type-page-dto-data-res';
import { PriceListService } from 'src/app/service/price-list.service';
import { PriceTypeService } from 'src/app/service/price-type.service';

@Component({
  selector: 'app-price-list-update',
  templateUrl: './price-list-update.component.html',
  styleUrls: ['./price-list-update.component.scss']
})
export class PriceListUpdateComponent implements OnInit , OnDestroy{

  priceList : UpdatePriceListDtoReq = new UpdatePriceListDtoReq()
  priceType: GetAllPriceTypePageDtoDataRes[]=[]

  activatedRouteSubscription? : Subscription
  getByIdSubscription? : Subscription
  getAllPriceTypeSubscription? : Subscription
  updateSubscription? : Subscription

  constructor(private activatedRoute : ActivatedRoute, private router : Router, private priceListService : PriceListService,private priceTypeService : PriceTypeService) { }


  ngOnInit(): void {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(result => {
      const id: string = (result as any).id 
      this.getByIdSubscription = this.priceListService.getById(id).subscribe(result => {
        this.priceList = result.data
      })
    })
    this.getAllPriceTypeSubscription = this.priceTypeService.getAllPriceType().subscribe(result => {
      this.priceType = result.data
    })
  }

  update(isValid: boolean):void {
    if(isValid){
      this.updateSubscription = this.priceListService.update(this.priceList).subscribe(result=>{
        if(result){
          this.router.navigateByUrl('/price-list/list');
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription?.unsubscribe()
    this.getByIdSubscription?.unsubscribe()
    this.getAllPriceTypeSubscription?.unsubscribe()
    this.updateSubscription?.unsubscribe()
  }
}
