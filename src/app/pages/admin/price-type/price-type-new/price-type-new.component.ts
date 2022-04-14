import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { InsertPriceTypeDtoReq } from 'src/app/dto/price-type/insert-price-type-dto-req';
import { InsertPriceTypeDtoRes } from 'src/app/dto/price-type/insert-price-type-dto-res';
import { PriceTypeService } from 'src/app/service/price-type.service';

@Component({
  selector: 'app-price-type-new',
  templateUrl: './price-type-new.component.html',
  styleUrls: ['./price-type-new.component.scss']
})
export class PriceTypeNewComponent implements OnInit {

  priceType: InsertPriceTypeDtoReq = new InsertPriceTypeDtoReq()
  priceTypeData: InsertPriceTypeDtoRes

  constructor(private router : Router, private priceTypeService : PriceTypeService) { }

  ngOnInit(): void {
  }

  async insert(isValid: boolean): Promise<void> {
    if(isValid){
      this.priceTypeData = await firstValueFrom(this.priceTypeService.insert(this.priceType))
      if(this.priceTypeData.data){
        this.router.navigateByUrl('/price-type/list')
      }
    }
  }

}
