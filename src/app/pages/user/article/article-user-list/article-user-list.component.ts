import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { firstValueFrom, Subscription } from 'rxjs';
import { GetAllEventCourseDtoDataRes } from 'src/app/dto/event-course/get-all-event-course-dto-data-res';
import { GetAllThreadPageDtoRes } from 'src/app/dto/thread/get-all-thread-page-dto-res';
import { EventCourseService } from 'src/app/service/event-course.service';
import { LoginService } from 'src/app/service/login.service';
import { ThreadService } from 'src/app/service/thread.service';
import * as moment from 'moment';
import { GetAllEventCourseDtoRes } from 'src/app/dto/event-course/get-all-event-course-dto-res';
import { GetThreadDataDtoRes } from 'src/app/dto/thread/get-thread-data-dto-res';

@Component({
  selector: 'app-article-user-list',
  templateUrl: './article-user-list.component.html',
  styleUrls: ['./article-user-list.component.scss'],
  providers: [ConfirmationService]

})
export class ArticleUserListComponent implements OnInit {

  events: GetAllEventCourseDtoDataRes[] = []
  courses: GetAllEventCourseDtoDataRes[] = []
  eventData: GetAllEventCourseDtoRes
  courseData: GetAllEventCourseDtoRes

  dataArticle : GetThreadDataDtoRes[]=[]
  article : GetAllThreadPageDtoRes

  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true
  idType: string = '2'
  isActive: boolean = true
  idUser : string

  constructor(private router : Router, private confirmationService: ConfirmationService, private loginService : LoginService,
              private threadService : ThreadService, private eventCourseService: EventCourseService) { }

  ngOnInit(): void {
    this.initData()
    if(this.loginService.getData()!=null){
      this.idUser = this.loginService.getData().data.id
    }
  }

  initData(): void {
    this.getAllData()
  }

  async getAllData() : Promise<void>{
    this.eventData = await firstValueFrom(this.eventCourseService.getActiveEventCourse('Event',this.idUser))
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
      this.article = await firstValueFrom(this.threadService.getArticleActiveWithPage(this.idType, startPage, maxPage, this.isActive))
      this.dataArticle = this.article.data
      this.loading = false
      this.totalRecords = this.article.total
    }
    catch(error){
      this.loading = false
    }
  }

  toArticleDetail(isPremium: boolean, id: string) {
    this.router.navigateByUrl(`/user/article/${id}`)
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
