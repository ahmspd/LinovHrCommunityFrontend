import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InsertIndustryDtoReq } from 'src/app/dto/industry/insert-industry-dto-req';
import { IndustryService } from 'src/app/service/industry.service';

@Component({
  selector: 'app-industry-new',
  templateUrl: './industry-new.component.html',
  styleUrls: ['./industry-new.component.scss']
})
export class IndustryNewComponent implements OnInit {

  industry: InsertIndustryDtoReq = new InsertIndustryDtoReq()

  constructor(private industryService: IndustryService, private router: Router) { }

  ngOnInit(): void {
  }

  insert(isValid: boolean): void {
    if(isValid){
      this.industryService.insert(this.industry).subscribe(result => {
        console.log(result)
        this.router.navigateByUrl('/industry/list')
      })
    }
  }

}
