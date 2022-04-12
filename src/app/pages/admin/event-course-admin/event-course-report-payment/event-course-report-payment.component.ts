import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Subscription } from 'rxjs';
import { GetReportEventCoursePaymentDtoDataRes } from 'src/app/dto/event-course-payment/get-report-event-course-payment-dto-data-res';
import { GetReportEventCoursePaymentDtoRes } from 'src/app/dto/event-course-payment/get-report-event-course-payment-dto-res';
import { EventCoursePaymentService } from 'src/app/service/event-course-payment.service';

@Component({
  selector: 'app-event-course-report-payment',
  templateUrl: './event-course-report-payment.component.html',
  styleUrls: ['./event-course-report-payment.component.scss'],
  providers: [ConfirmationService]
})
export class EventCourseReportPaymentComponent implements OnInit ,OnDestroy{

  reportData : GetReportEventCoursePaymentDtoDataRes[]=[]
  getAllSubscription? : Subscription
  maxPage: number = 10
  totalRecords: number = 0
  startPage : number = 0
  loading: boolean = true
  constructor(private eventCoursePaymentService: EventCoursePaymentService, private router: Router, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    console.log(event)
    this.getData(event.first, event.rows)
  }

  getData(startPage: number = this.startPage, maxPage: number = this.maxPage): void {
    this.loading = true;

    this.getAllSubscription = this.eventCoursePaymentService.getReportPaymentByAdmin(startPage, maxPage).subscribe({
      next: result => {
        const resultData: any = result
        this.reportData = resultData.data
        this.loading = false
        this.totalRecords = resultData.total
        console.log(resultData.total)
      },
      error: _ => this.loading = false
    })
  }


  ngOnDestroy(): void {
    this.getAllSubscription?.unsubscribe()
  }
}
