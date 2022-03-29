import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UpdateIndustryDtoReq } from 'src/app/dto/industry/update-industry-dto-req';
import { IndustryService } from 'src/app/service/industry.service';

@Component({
  selector: 'app-industry-update',
  templateUrl: './industry-update.component.html',
  styleUrls: ['./industry-update.component.scss']
})
export class IndustryUpdateComponent implements OnInit, OnDestroy {

  industry: UpdateIndustryDtoReq = new UpdateIndustryDtoReq()
  industrySubsGetById?: Subscription
  industrySubsUpdate?: Subscription
  activateRouteSubscription?: Subscription

  constructor(private industryService: IndustryService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activateRouteSubscription = this.activatedRoute.params.subscribe(result => {
      const id: string = (result as any).id
      this.industrySubsGetById = this.industryService.getById(id).subscribe(result => {
        this.industry = result.data
      })
    })
  }

  update(isValid: boolean): void {
    if (isValid) {
      this.industrySubsUpdate = this.industryService.update(this.industry).subscribe(result => {
        this.router.navigateByUrl('/industry/list')
      })
    }
  }

  ngOnDestroy(): void {
    this.industrySubsGetById?.unsubscribe()
    this.industrySubsUpdate?.unsubscribe()
    this.activateRouteSubscription?.unsubscribe()
  }

}
