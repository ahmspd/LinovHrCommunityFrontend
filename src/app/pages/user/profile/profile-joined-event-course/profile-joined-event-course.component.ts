import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventCourseService } from 'src/app/service/event-course.service';
import { LoginService } from 'src/app/service/login.service';
import { GetAllEventCourseDtoDataRes } from "../../../../dto/event-course/get-all-event-course-dto-data-res";
import * as moment from 'moment';

@Component({
  selector: 'app-profile-joined-event-course',
  templateUrl: './profile-joined-event-course.component.html',
  styleUrls: ['./profile-joined-event-course.component.scss']
})
export class ProfileJoinedEventCourseComponent implements OnInit {

  dataEventCourse: GetAllEventCourseDtoDataRes[] = []
  getAllDataEventCourseSubs?: Subscription

  constructor(public router: Router, private loginService: LoginService, private eventCourseService: EventCourseService) { }

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    this.getAllDataEventCourseSubs = this.eventCourseService.getJoinedEventCourse().subscribe(result => {
      this.dataEventCourse = result.data
    })
  }

  dateFormatter(date: moment.MomentInput): String {
    return moment(date).format('YYYY-MM-DD HH:mm')
  }

  toLogout(){
    this.loginService.clearData()
    this.router.navigateByUrl("/login")
  }

}
