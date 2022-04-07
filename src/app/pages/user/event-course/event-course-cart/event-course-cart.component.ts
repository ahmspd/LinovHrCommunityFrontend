import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetAllEventCoursePaymentDetailDtoDataRes } from 'src/app/dto/event-course-payment-detail/get-all-event-course-payment-detail-dto-data-res';
import { EventCoursePaymentDetailService } from 'src/app/service/event-course-payment-detail.service';
import * as moment from 'moment';

@Component({
  selector: 'app-event-course-cart',
  templateUrl: './event-course-cart.component.html',
  styleUrls: ['./event-course-cart.component.scss']
})
export class EventCourseCartComponent implements OnInit {

  unpaidEventCourses: GetAllEventCoursePaymentDetailDtoDataRes[] = []
  getUnpaidEventCourses: Subscription

  constructor(private eventCoursePaymentDetailService: EventCoursePaymentDetailService) { }

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    this.getUnpaidEventCourses = this.eventCoursePaymentDetailService.getUnpaidEventCourse().subscribe(result => {
      this.unpaidEventCourses = result.data
    })
  }

  dateFormatter(date: moment.MomentInput): String {
    return moment(date).format('ddd, DD MMM YY')
  }
}
