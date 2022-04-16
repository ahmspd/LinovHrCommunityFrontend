import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { GetAllEventCourseDtoRes } from 'src/app/dto/event-course/get-all-event-course-dto-res';
import { EventCourseService } from 'src/app/service/event-course.service';
import { LoginService } from 'src/app/service/login.service';
import { GetAllEventCourseDtoDataRes } from "../../../../dto/event-course/get-all-event-course-dto-data-res";

@Component({
  selector: 'app-profile-joined-event-course',
  templateUrl: './profile-joined-event-course.component.html',
  styleUrls: ['./profile-joined-event-course.component.scss']
})
export class ProfileJoinedEventCourseComponent implements OnInit {

  dataEventCourse: GetAllEventCourseDtoDataRes[] = []
  data: GetAllEventCourseDtoRes

  constructor(public router: Router, private loginService: LoginService, private eventCourseService: EventCourseService) { }

  ngOnInit(): void {
    this.initData()
  }

  async initData(): Promise<void> {
    this.data = await firstValueFrom(this.eventCourseService.getJoinedEventCourse())
    this.dataEventCourse = this.data.data
  }

  dateFormatter(date: moment.MomentInput): String {
    return moment(date).format('YYYY-MM-DD HH:mm')
  }

  toLogout(){
    this.loginService.clearData()
    this.router.navigateByUrl("/login")
  }

}
