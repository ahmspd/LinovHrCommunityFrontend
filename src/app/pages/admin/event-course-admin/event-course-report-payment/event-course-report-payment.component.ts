import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { GetReportEventCoursePaymentDtoDataRes } from 'src/app/dto/event-course-payment/get-report-event-course-payment-dto-data-res';
import { GetReportEventCoursePaymentDtoRes } from 'src/app/dto/event-course-payment/get-report-event-course-payment-dto-res';
import { EventCoursePaymentService } from 'src/app/service/event-course-payment.service';

@Component({
  selector: 'app-event-course-report-payment',
  templateUrl: './event-course-report-payment.component.html',
  styleUrls: ['./event-course-report-payment.component.scss'],
  providers: [ConfirmationService]
})
export class EventCourseReportPaymentComponent implements OnInit{

  reportData : GetReportEventCoursePaymentDtoDataRes[]=[]
  report : GetReportEventCoursePaymentDtoRes

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

  async getData(startPage: number = this.startPage, maxPage: number = this.maxPage): Promise<void> {
    this.loading = true;

    try{
      this.report = await firstValueFrom(this.eventCoursePaymentService.getReportPaymentByAdmin(startPage,maxPage))
      this.reportData = this.report.data
      this.loading = false
      this.totalRecords = this.report.total
    }
    catch(error){
      this.loading = false
    }
  }

}
