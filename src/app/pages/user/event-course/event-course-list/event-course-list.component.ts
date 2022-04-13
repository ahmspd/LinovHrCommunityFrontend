import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetAllEventCourseDtoDataRes } from 'src/app/dto/event-course/get-all-event-course-dto-data-res';
import { EventCourseService } from 'src/app/service/event-course.service';
import * as moment from 'moment';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { ThreadService } from 'src/app/service/thread.service';
import { GetThreadDataDtoRes } from 'src/app/dto/thread/get-thread-data-dto-res';

@Component({
  selector: 'app-event-course-list',
  templateUrl: './event-course-list.component.html',
  styleUrls: ['./event-course-list.component.scss'],
  providers: [ConfirmationService]
})
export class EventCourseListComponent implements OnInit, OnDestroy {

  events: GetAllEventCourseDtoDataRes[] = []
  courses: GetAllEventCourseDtoDataRes[] = []
  dataArticle: GetThreadDataDtoRes[] = []


  getEventsSubscription?: Subscription
  getCoursesSubscription?: Subscription
  joinSubscription?: Subscription
  getAllArticleSubscription?: Subscription

  idType: string = '2'

  constructor(private eventCourseService: EventCourseService, private confirmationService: ConfirmationService, 
    private router: Router, private threadService: ThreadService) { }

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

    this.getAllArticleSubscription = this.threadService.getArticleActiveWithPage(this.idType, 0, 2, true).subscribe(result => {
      this.dataArticle = result.data
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

  joinVal(isJoin: boolean): boolean {
    if (isJoin == null) {
      return null
    }
    return null
  }

  join(event: String, idEvent: String) {
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
