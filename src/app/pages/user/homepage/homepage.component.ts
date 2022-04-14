import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { GetAllEventCourseDtoDataRes } from 'src/app/dto/event-course/get-all-event-course-dto-data-res';
import { GetAllEventCourseDtoRes } from 'src/app/dto/event-course/get-all-event-course-dto-res';
import { GetThreadDataDtoRes } from 'src/app/dto/thread/get-thread-data-dto-res';
import { GetThreadDtoRes } from 'src/app/dto/thread/get-thread-dto-res';
import { EventCourseService } from 'src/app/service/event-course.service';
import { LoginService } from 'src/app/service/login.service';
import { ThreadService } from 'src/app/service/thread.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit{

  events: GetAllEventCourseDtoDataRes[] = []
  courses: GetAllEventCourseDtoDataRes[] = []
  eventData: GetAllEventCourseDtoRes
  courseData: GetAllEventCourseDtoRes
  articleData : GetThreadDataDtoRes[]=[]
  threadData : GetThreadDataDtoRes[]=[]
  thread : GetThreadDtoRes
  article : GetThreadDtoRes

  isPremium:boolean = false
  responsiveOptions!: any[]

  idUser? : string

  constructor(public router : Router, private threadService : ThreadService, private loginService : LoginService, private eventCourseService: EventCourseService) { 
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ]
  }

  ngOnInit(): void {
    this.initData()
    if(this.loginService.getData()!=null){
      this.idUser = this.loginService.getData().data.id
    }
  }

  async initData(): Promise<void> {
    this.article = await firstValueFrom(this.threadService.getThreadByType('2'))
    this.articleData = this.article.data
    this.thread = await firstValueFrom(this.threadService.getThread())
    this.threadData = this.thread.data
    if(this.loginService.getData()!=null){
      this.isPremium = this.loginService.getData().data.isMember
    }
    this.eventData = await firstValueFrom(this.eventCourseService.getActiveEventCourse('Event', this.idUser))
    this.events = this.eventData.data
    this.courseData = await firstValueFrom(this.eventCourseService.getActiveEventCourse('Course', this.idUser))
    this.courses = this.courseData.data
  }

  toThread(){
    this.router.navigateByUrl('/thread/list')
  }

  articleDetail(id:number):void{
    this.router.navigateByUrl(`/user/article/${id}`)
  }
  threadDetail(id:number):void{
    this.router.navigateByUrl(`/thread/${id}`)
  }
  
}
