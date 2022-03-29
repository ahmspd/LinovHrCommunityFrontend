import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UpdatePriceTypeDtoReq } from 'src/app/dto/price-type/update-price-type-dto-req';
import { PriceTypeService } from 'src/app/service/price-type.service';

@Component({
  selector: 'app-price-type-update',
  templateUrl: './price-type-update.component.html',
  styleUrls: ['./price-type-update.component.scss']
})
export class PriceTypeUpdateComponent implements OnInit , OnDestroy{

  priceType: UpdatePriceTypeDtoReq = new UpdatePriceTypeDtoReq()
  getByIdPriceTypeSubscrition? : Subscription
  updatePriceTypeSubscription? : Subscription
  activetedRouteSubscription? : Subscription

  constructor(private activatedRoute : ActivatedRoute, private router : Router, private priceTypeService : PriceTypeService) { }

  ngOnInit(): void {
    this.activetedRouteSubscription = this.activatedRoute.params.subscribe(result =>{
      const id: string = (result as any).id
      this.getByIdPriceTypeSubscrition = this.priceTypeService.getById(id).subscribe(result => {
        this.priceType = result.data
      })
    })
  }

  update(isValid: boolean) : void {
    if(isValid){
      this.updatePriceTypeSubscription = this.priceTypeService.update(this.priceType).subscribe(result => {
        if(result){
          this.router.navigateByUrl('/price-type/list')
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.activetedRouteSubscription?.unsubscribe()
    this.getByIdPriceTypeSubscrition?.unsubscribe()
    this.updatePriceTypeSubscription?.unsubscribe()
  }
}
