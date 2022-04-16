import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';
import { GetByIdPriceTypeDtoRes } from 'src/app/dto/price-type/get-by-id-price-type-dto-res';
import { UpdatePriceTypeDtoReq } from 'src/app/dto/price-type/update-price-type-dto-req';
import { UpdatePriceTypeDtoRes } from 'src/app/dto/price-type/update-price-type-dto-res';
import { PriceTypeService } from 'src/app/service/price-type.service';

@Component({
  selector: 'app-price-type-update',
  templateUrl: './price-type-update.component.html',
  styleUrls: ['./price-type-update.component.scss']
})
export class PriceTypeUpdateComponent implements OnInit {

  priceType: UpdatePriceTypeDtoReq = new UpdatePriceTypeDtoReq()
  priceTypeData: GetByIdPriceTypeDtoRes
  priceTypeUpdate: UpdatePriceTypeDtoRes

  idPriceType: string

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private priceTypeService: PriceTypeService) { }

  ngOnInit(): void {
    this.getData()
  }

  async getData(): Promise<void> {
    const result = await firstValueFrom(this.activatedRoute.params.pipe(map(result => result)))
    this.idPriceType = (result as any).id
    this.priceTypeData = await firstValueFrom(this.priceTypeService.getById(this.idPriceType))
    this.priceType = this.priceTypeData.data
  }
  
  async update(isValid: boolean): Promise<void> {
    if (isValid) {
      this.priceTypeUpdate = await firstValueFrom(this.priceTypeService.update(this.priceType))
      if (this.priceTypeUpdate.data) {
        this.router.navigateByUrl('/price-type/list')
      }
    }
  }

}
