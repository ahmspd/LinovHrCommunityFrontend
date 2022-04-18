import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { GetAllEventCourseDtoDataRes } from 'src/app/dto/event-course/get-all-event-course-dto-data-res';
import { GetAllThreadPageDtoRes } from 'src/app/dto/thread/get-all-thread-page-dto-res';
import { GetThreadDataDtoRes } from 'src/app/dto/thread/get-thread-data-dto-res';
import { EventCourseService } from 'src/app/service/event-course.service';
import { LoginService } from 'src/app/service/login.service';
import { ThreadService } from 'src/app/service/thread.service';
import * as moment from 'moment';
import { GetAllEventCourseDtoRes } from 'src/app/dto/event-course/get-all-event-course-dto-res';

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.scss'],
  providers: [ConfirmationService]
})
export class ThreadListComponent implements OnInit {

  events: GetAllEventCourseDtoDataRes[] = []
  courses: GetAllEventCourseDtoDataRes[] = []
  eventData: GetAllEventCourseDtoRes
  courseData: GetAllEventCourseDtoRes

  dataThread: GetThreadDataDtoRes[] = []
  thread : GetAllThreadPageDtoRes
  dataArticle: GetThreadDataDtoRes[] = []
  article: GetAllThreadPageDtoRes

  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true
  idType: string = '2'
  idUser? : string

  constructor(private router: Router, private confirmationService: ConfirmationService, private threadService: ThreadService, 
    private loginService: LoginService, private eventCourseService: EventCourseService) { }

  ngOnInit(): void {
    if(this.loginService.getData()!=null){
      this.idUser = this.loginService.getData().data.id
    }
    this.initData()
  }

  async initData(): Promise<void> {
    this.article = await firstValueFrom(this.threadService.getArticleActiveWithPage(this.idType, 0, 2, true))
    this.dataArticle = this.article.data
    this.eventData = await firstValueFrom(this.eventCourseService.getActiveEventCourse('Event', this.idUser))
    this.events = this.eventData.data
    this.courseData = await firstValueFrom(this.eventCourseService.getActiveEventCourse('Course', this.idUser))
    this.courses = this.courseData.data
  }

  loadData(event: LazyLoadEvent) {
    console.log(event)
    this.getData(event.first, event.rows)
  }

  async getData(startPage: number = 0, maxPage: number = this.maxPage): Promise<void> {
    this.loading = true;

    try{
      this.thread = await firstValueFrom(this.threadService.getThreadWithPage(startPage, maxPage))
      this.dataThread = this.thread.data
      this.loading = false
      this.totalRecords = this.thread.total
    }
    catch(error){
      this.loading = false
    }
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

}
