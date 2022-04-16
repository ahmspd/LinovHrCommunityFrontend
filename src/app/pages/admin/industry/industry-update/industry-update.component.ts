import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';
import { GetByIdIndustryDtoRes } from 'src/app/dto/industry/get-by-id-industry-dto-res';
import { UpdateIndustryDtoReq } from 'src/app/dto/industry/update-industry-dto-req';
import { UpdateIndustryDtoRes } from 'src/app/dto/industry/update-industry-dto-res';
import { IndustryService } from 'src/app/service/industry.service';

@Component({
  selector: 'app-industry-update',
  templateUrl: './industry-update.component.html',
  styleUrls: ['./industry-update.component.scss']
})
export class IndustryUpdateComponent implements OnInit {

  industry: UpdateIndustryDtoReq = new UpdateIndustryDtoReq()
  industryData: GetByIdIndustryDtoRes
  industryUpdate : UpdateIndustryDtoRes
  idIndustry : string

  constructor(private industryService: IndustryService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getData()
  }

  async getData() : Promise<void> {
    try {
      const result = await firstValueFrom(this.activatedRoute.params.pipe(map(result=>result)))
      this.idIndustry = (result as any).id
      this.industryData = await firstValueFrom(this.industryService.getById(this.idIndustry))
      this.industry = this.industryData.data
    }
    catch(error){

    }
  }

  async update(isValid: boolean): Promise<void> {
    if (isValid) {
      this.industryUpdate = await firstValueFrom(this.industryService.update(this.industry))
      if(this.industryUpdate.data){
        this.router.navigateByUrl('/industry/list')
      }
    }
  }

}
