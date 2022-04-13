import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Subscription } from 'rxjs';
import { GetAllEventCourseDtoDataRes } from 'src/app/dto/event-course/get-all-event-course-dto-data-res';
import { GetAllThreadPageDtoRes } from 'src/app/dto/thread/get-all-thread-page-dto-res';
import { GetThreadDataDtoRes } from 'src/app/dto/thread/get-thread-data-dto-res';
import { EventCourseService } from 'src/app/service/event-course.service';
import { LoginService } from 'src/app/service/login.service';
import { ThreadService } from 'src/app/service/thread.service';
import * as moment from 'moment';

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.scss'],
  providers: [ConfirmationService]
})
export class ThreadListComponent implements OnInit, OnDestroy {

  events: GetAllEventCourseDtoDataRes[] = []
  courses: GetAllEventCourseDtoDataRes[] = []
  dataThread: GetAllThreadPageDtoRes[] = []
  dataArticle: GetThreadDataDtoRes[] = []
  //subscription
  getEventsSubscription?: Subscription
  getCoursesSubscription?: Subscription
  getAllSubscription?: Subscription
  getAllArticleSubscription?: Subscription

  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true
  idType: string = '2'

  constructor(private router: Router, private confirmationService: ConfirmationService, private threadService: ThreadService, 
    private loginService: LoginService, private eventCourseService: EventCourseService) { }

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    this.getAllArticleSubscription = this.threadService.getArticleActiveWithPage(this.idType, 0, 2, true).subscribe(result => {
      this.dataArticle = result.data
    })

    this.getEventsSubscription = this.eventCourseService.getActiveEventCourse('Event').subscribe(result => {
      this.events = result.data
    })

    this.getCoursesSubscription = this.eventCourseService.getActiveEventCourse('Course').subscribe(result => {
      this.courses = result.data
    })

  }

  loadData(event: LazyLoadEvent) {
    console.log(event)
    this.getData(event.first, event.rows)
  }

  getData(startPage: number = 0, maxPage: number = this.maxPage): void {
    this.loading = true;

    this.getAllSubscription = this.threadService.getThreadWithPage(startPage, maxPage).subscribe({
      next: result => {
        const resultData: any = result
        this.dataThread = resultData.data
        this.loading = false
        this.totalRecords = resultData.total
        console.log(resultData.total)
      },
      error: _ => this.loading = false
    })
  }

  toThreadDetail(isPremium: boolean, id: string) {
    if (isPremium) {
      if (this.loginService.getData() != null) {
        if (this.loginService.getData().data.isMember) {
          this.router.navigateByUrl(`/thread/${id}`)
        }
        else {
          console.log("go member");
        }
      }
      else {
        this.router.navigateByUrl(`/login`)
      }
    }
    else {
      this.router.navigateByUrl(`/thread/${id}`)
    }
  }

  dateFormatter(date: moment.MomentInput): String {
    return moment(date).format('ddd, DD MMM')
  }

  timeFormatter(time: String): String {
    return time.substring(0, 5)
  }

  priceFormatter(price: any): String {
    return `Rp.${price}`
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
    this.getAllSubscription?.unsubscribe()
    this.getAllArticleSubscription?.unsubscribe()
  }
}
