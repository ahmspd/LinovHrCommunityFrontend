import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetAllEventCourseDtoDataRes } from 'src/app/dto/event-course/get-all-event-course-dto-data-res';
import { EventCourseService } from 'src/app/service/event-course.service';
import * as moment from 'moment'
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-course-list',
  templateUrl: './event-course-list.component.html',
  styleUrls: ['./event-course-list.component.scss'],
  providers: [ConfirmationService]
})
export class EventCourseListComponent implements OnInit, OnDestroy {

  events: GetAllEventCourseDtoDataRes[] = []
  courses: GetAllEventCourseDtoDataRes[] = []

  getEventsSubscription?: Subscription
  getCoursesSubscription?: Subscription
  joinSubscription?: Subscription

  constructor(private eventCourseService: EventCourseService, private confirmationService: ConfirmationService, private router: Router) { }

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    this.getEventsSubscription = this.eventCourseService.getActiveEventCourse('Event').subscribe(result => {
      this.events = result.data
    })
    this.getCoursesSubscription = this.eventCourseService.getActiveEventCourse('Course').subscribe(result => {
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

  joinVal(isJoin: boolean): boolean {
    if (isJoin == null) {
      return null
    }
    return null
  }

  confirm(event: String, idEvent: String) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to join ${event} ?`,
      header: 'Confirmation',
      icon: 'pi pi-check-circle',
      accept: () => {
        this.router.navigateByUrl(`/event-course/join/${idEvent}`)
      },
      reject: () => {
        this.initData()
      }
    });
  }

  ngOnDestroy(): void {
    this.getCoursesSubscription?.unsubscribe()
    this.getEventsSubscription?.unsubscribe()
    this.joinSubscription?.unsubscribe()
  }

}
