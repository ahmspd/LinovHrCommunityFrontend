import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetAllEventCourseDtoDataRes } from 'src/app/dto/event-course/get-all-event-course-dto-data-res';
import { EventCourseService } from 'src/app/service/event-course.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-course-created-list',
  templateUrl: './event-course-created-list.component.html',
  styleUrls: ['./event-course-created-list.component.scss']
})
export class EventCourseCreatedListComponent implements OnInit, OnDestroy {

  events: GetAllEventCourseDtoDataRes[] = []
  courses: GetAllEventCourseDtoDataRes[] = []

  getEventsSubscription?: Subscription
  getCoursesSubscription?: Subscription
  joinSubscription?: Subscription

  constructor(private eventCourseService: EventCourseService, private router: Router) { }

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    this.getEventsSubscription = this.eventCourseService.getEventCourseByCreatedBy('Event').subscribe(result => {
      this.events = result.data
    })
    this.getCoursesSubscription = this.eventCourseService.getEventCourseByCreatedBy('Course').subscribe(result => {
      this.courses = result.data
    })
  }

  dateFormatter(date: moment.MomentInput): String {
    return moment(date).format('ddd, DD MMM YY')
  }

  timeFormatter(time: String): String {
    return time.substring(0, 5)
  }

  priceFormatter(price: any): String {
    return `Rp ${price}`
  }

  confirm(idEvent: string): void {
    this.router.navigateByUrl(`/event-course/order-list/${idEvent}`)
  }

  pay(): void {
    
  }

  ngOnDestroy(): void {
    this.getEventsSubscription?.unsubscribe()
    this.joinSubscription?.unsubscribe()
  }

}
