import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetAllEventCourseDtoDataRes } from 'src/app/dto/event-course/get-all-event-course-dto-data-res';
import { EventCourseService } from 'src/app/service/event-course.service';
import * as moment from 'moment';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-profile-event-course',
  templateUrl: './profile-event-course.component.html',
  styleUrls: ['./profile-event-course.component.scss']
})
export class ProfileEventCourseComponent implements OnInit, OnDestroy {

  events: GetAllEventCourseDtoDataRes[] = []
  courses: GetAllEventCourseDtoDataRes[] = []

  getEventsSubscription?: Subscription
  getCoursesSubscription?: Subscription
  joinSubscription?: Subscription

  constructor(private eventCourseService: EventCourseService, public router: Router, private loginService: LoginService) { }

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
    return price.toLocaleString('en-ID',{style: 'currency', currency: 'IDR'})
  }

  confirm(idEvent: string): void {
    this.router.navigateByUrl(`/event-course/order-list/${idEvent}`)
  }

  toLogout(){
    this.loginService.clearData()
    this.router.navigateByUrl("/login")
  }

  ngOnDestroy(): void {
    this.getEventsSubscription?.unsubscribe()
    this.joinSubscription?.unsubscribe()
  }

}
