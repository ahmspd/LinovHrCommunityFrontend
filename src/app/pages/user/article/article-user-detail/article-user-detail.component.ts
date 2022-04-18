import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { firstValueFrom, map } from 'rxjs';
import { GetAllEventCourseDtoDataRes } from 'src/app/dto/event-course/get-all-event-course-dto-data-res';
import { GetAllEventCourseDtoRes } from 'src/app/dto/event-course/get-all-event-course-dto-res';
import { GetThreadDataDtoRes } from 'src/app/dto/thread/get-thread-data-dto-res';
import { GetThreadDetailDtoRes } from 'src/app/dto/thread/get-thread-detail-dto-res';
import { EventCourseService } from 'src/app/service/event-course.service';
import { ThreadService } from 'src/app/service/thread.service';
import * as moment from 'moment';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-article-user-detail',
  templateUrl: './article-user-detail.component.html',
  styleUrls: ['./article-user-detail.component.scss'],
  providers: [ConfirmationService]
})
export class ArticleUserDetailComponent implements OnInit{

  events: GetAllEventCourseDtoDataRes[] = []
  courses: GetAllEventCourseDtoDataRes[] = []
  eventData: GetAllEventCourseDtoRes
  courseData: GetAllEventCourseDtoRes
  
  articleDetailData: GetThreadDataDtoRes = new GetThreadDataDtoRes()
  articleDetail : GetThreadDetailDtoRes

  idUser : string
  idThread:string

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private threadService: ThreadService,
    private confirmationService: ConfirmationService, private eventCourseService: EventCourseService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.getData()
  }

  async getData(): Promise<void> {
    const result = await firstValueFrom(this.activatedRoute.params.pipe(map(result=>result)))
    this.idThread = (result as any).id

    this.articleDetail = await firstValueFrom(this.threadService.getThreadDetail(this.idThread))
    this.articleDetailData = this.articleDetail.data

    this.eventData = await firstValueFrom(this.eventCourseService.getActiveEventCourse('Event',this.idUser))
    this.events = this.eventData.data
    this.courseData = await firstValueFrom(this.eventCourseService.getActiveEventCourse('Course', this.idUser))
    this.courses = this.courseData.data

    if (this.loginService.getData() != null) {
      this.idUser = this.loginService.getData().data.id
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
        this.getData()
      }
    });
  }

  confirm(idEvent: string): void {
    this.router.navigateByUrl(`/event-course/order-list/${idEvent}`)
  }
}
