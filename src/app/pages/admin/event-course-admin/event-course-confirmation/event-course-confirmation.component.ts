import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { GetAllEventCoursePaymentDtoDataRes } from 'src/app/dto/event-course-payment/get-all-event-course-payment-dto-data-res';
import { UpdateEventCoursePaymentDtoReq } from 'src/app/dto/event-course-payment/update-event-course-payment-dto-req';
import { EventCoursePaymentService } from 'src/app/service/event-course-payment.service';

@Component({
  selector: 'app-event-course-confirmation',
  templateUrl: './event-course-confirmation.component.html',
  styleUrls: ['./event-course-confirmation.component.scss'],
  providers: [ConfirmationService]
})
export class EventCourseConfirmationComponent implements OnInit, OnDestroy {

  constructor(private eventCoursePaymentService: EventCoursePaymentService, private router: Router, private confirmationService: ConfirmationService) { }

  confirmPayment: UpdateEventCoursePaymentDtoReq = new UpdateEventCoursePaymentDtoReq()
  payments: GetAllEventCoursePaymentDtoDataRes[] = []
  paymentsSubs?: Subscription
  confirmPaymentSubs?: Subscription
  // industrySubsDeleteMultiple?: Subscription
  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    this.paymentsSubs = this.eventCoursePaymentService.getAllUnAccepted().subscribe(result => {
      this.payments = result.data
    })
  }

  // loadData(event: LazyLoadEvent) {
  //   console.log(event)
  //   if(event.globalFilter){
  //     this.filter(event.globalFilter)
  //   }else {
  //     this.getData(event.first, event.rows)
  //   }
  // }

  // getData(startPage: number = 0, maxPage: number = this.maxPage): void {
  //   this.loading = true;

  //   this.industryService.getAll(startPage, maxPage).subscribe({
  //     next: result => {
  //       const resultData: any = result
  //       this.industries = resultData.data
  //       this.loading = false
  //       this.totalRecords = resultData.total
  //     },
  //     error: _ => this.loading = false
  //   })
  // }

  // update(id: string): void {
  //   this.router.navigateByUrl(`/industry/${id}`)
  // }

  // filter(text: string):void{
  //   this.industries = this.industries.filter(industry=>industry.industryName.includes(text))
  // }
  confirm(idPayment: string): void {
    this.confirmPayment.id = idPayment
    this.confirmationService.confirm({
      key: 'confirm',
      message: 'Are you sure to confirm this payment?',
      accept: () => {
        this.confirmPaymentSubs = this.eventCoursePaymentService.confirmPayment(this.confirmPayment).subscribe(_=> {
          this.initData()
        })
      },
      reject: () => {
        this.initData()
      }
    });
  }

  // doDelete(): void {
  //   const deleteData: DeleteMultipleIndustryDtoDataReq[] = []

  //   this.deleteIds.forEach(value => {
  //     const deleteIndustryId: DeleteMultipleIndustryDtoDataReq = new DeleteMultipleIndustryDtoDataReq()
  //     deleteIndustryId.id = value
  //     deleteData.push(deleteIndustryId)
  //   })

  //   this.deleteIndustry.data = deleteData
  //   this.industrySubsDeleteMultiple = this.industryService.deleteMultiple(this.deleteIndustry).subscribe(result => {
  //     this.getData()
  //   })
  // }
  priceFormatter(price: any): String {
    return price.toLocaleString('en-ID',{style: 'currency', currency: 'IDR'})
  }

  ngOnDestroy(): void {
    // this.industrySubsGetAll?.unsubscribe()
    // this.industrySubsDeleteMultiple?.unsubscribe()
    this.paymentsSubs?.unsubscribe()
    this.confirmPaymentSubs?.unsubscribe()
  }

}
