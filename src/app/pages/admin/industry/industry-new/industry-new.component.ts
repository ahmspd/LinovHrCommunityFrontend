import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { InsertIndustryDtoReq } from 'src/app/dto/industry/insert-industry-dto-req';
import { InsertIndustryDtoRes } from 'src/app/dto/industry/insert-industry-dto-res';
import { IndustryService } from 'src/app/service/industry.service';

@Component({
  selector: 'app-industry-new',
  templateUrl: './industry-new.component.html',
  styleUrls: ['./industry-new.component.scss']
})
export class IndustryNewComponent implements OnInit{

  industry: InsertIndustryDtoReq = new InsertIndustryDtoReq()
  industryData : InsertIndustryDtoRes

  constructor(private industryService: IndustryService, private router: Router) { }

  ngOnInit(): void {
  }

  async insert(isValid: boolean): Promise<void> {
    if(isValid){
      this.industryData = await firstValueFrom(this.industryService.insert(this.industry))
      if(this.industryData.data){
        this.router.navigateByUrl( `/industry/list`)
      }
    }
  }
 
}
