import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { GetAllEventCourseDtoDataRes } from 'src/app/dto/event-course/get-all-event-course-dto-data-res';
import { EventCourseService } from 'src/app/service/event-course.service';
import * as moment from 'moment';
import { LoginService } from 'src/app/service/login.service';
import { GetAllEventCourseDtoRes } from 'src/app/dto/event-course/get-all-event-course-dto-res';

@Component({
  selector: 'app-profile-event-course',
  templateUrl: './profile-event-course.component.html',
  styleUrls: ['./profile-event-course.component.scss']
})
export class ProfileEventCourseComponent implements OnInit {

  events: GetAllEventCourseDtoDataRes[] = []
  courses: GetAllEventCourseDtoDataRes[] = []
  eventData: GetAllEventCourseDtoRes
  courseData: GetAllEventCourseDtoRes
  idUser : string


  constructor(private eventCourseService: EventCourseService, public router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.initData()
    if(this.loginService.getData()!=null){
      this.idUser = this.loginService.getData().data.id
    }
  }

  async initData(): Promise<void> {
    this.eventData = await firstValueFrom(this.eventCourseService.getActiveEventCourse('Event', this.idUser))
    this.events = this.eventData.data
    this.courseData = await firstValueFrom(this.eventCourseService.getActiveEventCourse('Course', this.idUser))
    this.courses = this.courseData.data

    this.idUser = this.loginService.getData().data.id
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

}
