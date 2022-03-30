import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InsertIndustryDtoReq } from 'src/app/dto/industry/insert-industry-dto-req';
import { IndustryService } from 'src/app/service/industry.service';

@Component({
  selector: 'app-industry-new',
  templateUrl: './industry-new.component.html',
  styleUrls: ['./industry-new.component.scss']
})
export class IndustryNewComponent implements OnInit , OnDestroy{

  industry: InsertIndustryDtoReq = new InsertIndustryDtoReq()

  insertSubscription? : Subscription

  constructor(private industryService: IndustryService, private router: Router) { }

  ngOnInit(): void {
  }

  insert(isValid: boolean): void {
    if(isValid){
      this.insertSubscription = this.industryService.insert(this.industry).subscribe(result => {
        if(result){
          this.router.navigateByUrl('/industry/list')
        }
      })
    }
  }
 
  ngOnDestroy(): void {
    this.insertSubscription?.unsubscribe()
  }
}
