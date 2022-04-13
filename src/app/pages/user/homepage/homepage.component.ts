import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetAllEventCourseDtoDataRes } from 'src/app/dto/event-course/get-all-event-course-dto-data-res';
import { GetThreadDataDtoRes } from 'src/app/dto/thread/get-thread-data-dto-res';
import { EventCourseService } from 'src/app/service/event-course.service';
import { LoginService } from 'src/app/service/login.service';
import { ThreadService } from 'src/app/service/thread.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit , OnDestroy{

  events: GetAllEventCourseDtoDataRes[] = []
  courses: GetAllEventCourseDtoDataRes[] = []
  articleData : GetThreadDataDtoRes[]=[]
  threadData : GetThreadDataDtoRes[]=[]

  //Subscription
  getEventsSubscription?: Subscription
  getCoursesSubscription?: Subscription
  getArticleSubscription? : Subscription
  getThreadSubscription? : Subscription

  isPremium:boolean = false
  responsiveOptions!: any[]

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
  }

  initData(): void {
    this.getArticleSubscription = this.threadService.getThreadByType('2').subscribe(result=>{
      this.articleData = result.data
    })

    this.getThreadSubscription = this.threadService.getThread().subscribe(result=>{
      this.threadData = result.data
    })

    if(this.loginService!=null){
      this.isPremium = this.loginService.getData().data.isMember
    }

    this.getEventsSubscription = this.eventCourseService.getActiveEventCourse('Event').subscribe(result => {
      this.events = result.data
    })

    this.getCoursesSubscription = this.eventCourseService.getActiveEventCourse('Course').subscribe(result => {
      this.courses = result.data
    })
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
  
  ngOnDestroy(): void {
    this.getArticleSubscription?.unsubscribe()
    this.getThreadSubscription?.unsubscribe()
  }
}
