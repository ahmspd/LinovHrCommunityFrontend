import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { GetAllEventCourseDtoDataRes } from 'src/app/dto/event-course/get-all-event-course-dto-data-res';
import { GetAllEventCourseDtoRes } from 'src/app/dto/event-course/get-all-event-course-dto-res';
import { GetAllThreadPageDtoRes } from 'src/app/dto/thread/get-all-thread-page-dto-res';
import { GetThreadDataDtoRes } from 'src/app/dto/thread/get-thread-data-dto-res';
import { EventCourseService } from 'src/app/service/event-course.service';
import { LoginService } from 'src/app/service/login.service';
import { ThreadService } from 'src/app/service/thread.service';

@Component({
  selector: 'app-event-course-list',
  templateUrl: './event-course-list.component.html',
  styleUrls: ['./event-course-list.component.scss'],
  providers: [ConfirmationService]
})
export class EventCourseListComponent implements OnInit {

  events: GetAllEventCourseDtoDataRes[] = []
  courses: GetAllEventCourseDtoDataRes[] = []
  eventData: GetAllEventCourseDtoRes
  courseData: GetAllEventCourseDtoRes
  dataArticle: GetThreadDataDtoRes[] = []
  article: GetAllThreadPageDtoRes

  idType: string = '2'
  idUser: string

  constructor(private eventCourseService: EventCourseService, private confirmationService: ConfirmationService, 
    private router: Router, private threadService: ThreadService, private loginService : LoginService) { }

  ngOnInit(): void {
    if(this.loginService.getData()!=null){
      this.idUser = this.loginService.getData().data.id
    }
    this.initData()
  }

  async initData(): Promise<void> {
    this.eventData = await firstValueFrom(this.eventCourseService.getActiveEventCourse('Event', this.idUser))
    this.events = this.eventData.data
    this.courseData = await firstValueFrom(this.eventCourseService.getActiveEventCourse('Course', this.idUser))
    this.courses = this.courseData.data
    this.article = await firstValueFrom(this.threadService.getArticleActiveWithPage(this.idType, 0,2, true))
    this.dataArticle = this.article.data
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

  confirm(idEvent: string): void {
    this.router.navigateByUrl(`/event-course/order-list/${idEvent}`)
  }
}
