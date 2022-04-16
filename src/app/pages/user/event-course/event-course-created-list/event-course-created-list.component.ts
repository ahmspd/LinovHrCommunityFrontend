import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { GetAllEventCourseDtoDataRes } from 'src/app/dto/event-course/get-all-event-course-dto-data-res';
import { GetAllEventCourseDtoRes } from 'src/app/dto/event-course/get-all-event-course-dto-res';
import { EventCourseService } from 'src/app/service/event-course.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-event-course-created-list',
  templateUrl: './event-course-created-list.component.html',
  styleUrls: ['./event-course-created-list.component.scss']
})
export class EventCourseCreatedListComponent implements OnInit {

  events: GetAllEventCourseDtoDataRes[] = []
  courses: GetAllEventCourseDtoDataRes[] = []
  eventData: GetAllEventCourseDtoRes
  courseData: GetAllEventCourseDtoRes

  idUser : string
  constructor(private eventCourseService: EventCourseService, private router: Router, private loginService : LoginService) { }

  ngOnInit(): void {
    this.initData()
    if(this.loginService.getData()!=null){
      this.idUser = this.loginService.getData().data.id
    }
  }

  async initData():Promise<void> {
    this.eventData = await firstValueFrom(this.eventCourseService.getActiveEventCourse('Event', this.idUser))
    this.events = this.eventData.data
    this.courseData = await firstValueFrom(this.eventCourseService.getActiveEventCourse('Course', this.idUser))
    this.courses = this.courseData.data
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

  pay(): void {
    
  }

}
