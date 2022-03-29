import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InsertPriceTypeDtoReq } from 'src/app/dto/price-type/insert-price-type-dto-req';
import { PriceTypeService } from 'src/app/service/price-type.service';

@Component({
  selector: 'app-price-type-new',
  templateUrl: './price-type-new.component.html',
  styleUrls: ['./price-type-new.component.scss']
})
export class PriceTypeNewComponent implements OnInit, OnDestroy {

  priceType: InsertPriceTypeDtoReq = new InsertPriceTypeDtoReq()

  insertPriceTypeSubscription? : Subscription
  constructor(private router : Router, private priceTypeService : PriceTypeService) { }

  ngOnInit(): void {
  }

  insert(isValid: boolean): void {
    if(isValid){
      this.insertPriceTypeSubscription = this.priceTypeService.insert(this.priceType).subscribe(result => {
        if(result){
          this.router.navigateByUrl('/price-type/list')
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.insertPriceTypeSubscription.unsubscribe()
  }
}
