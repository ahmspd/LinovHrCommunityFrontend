import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationService } from 'primeng/api';
import { firstValueFrom, map } from 'rxjs';
import { ConfirmPayJoinEventCourseDtoRes } from 'src/app/dto/event-course/confirm-pay-join-event-course-dto-res';
import { GetByIdEventCourseDtoDataRes } from 'src/app/dto/event-course/get-by-id-event-course-dto-data-res';
import { GetByIdEventCourseDtoRes } from 'src/app/dto/event-course/get-by-id-event-course-dto-res';
import { GetOrderEventCourseDtoDataRes } from 'src/app/dto/event-course/get-order-event-course-dto-data-res';
import { GetOrderEventCourseDtoRes } from 'src/app/dto/event-course/get-order-event-course-dto-res';
import { GetAllThreadPageDtoRes } from 'src/app/dto/thread/get-all-thread-page-dto-res';
import { GetThreadDataDtoRes } from 'src/app/dto/thread/get-thread-data-dto-res';
import { EventCourseService } from 'src/app/service/event-course.service';
import { ThreadService } from 'src/app/service/thread.service';

@Component({
  selector: 'app-event-course-order-list',
  templateUrl: './event-course-order-list.component.html',
  styleUrls: ['./event-course-order-list.component.scss'],
  providers: [ConfirmationService]
})
export class EventCourseOrderListComponent implements OnInit {

  orders: GetOrderEventCourseDtoDataRes[] = []
  dataArticle: GetThreadDataDtoRes[] = []
  dataEventCourse: GetByIdEventCourseDtoDataRes = new GetByIdEventCourseDtoDataRes()
  eventCourse : GetByIdEventCourseDtoRes
  orderData : GetOrderEventCourseDtoRes
  article: GetAllThreadPageDtoRes
  dataConfirm: ConfirmPayJoinEventCourseDtoRes

  idEvent: String
  idType: string = '2'

  constructor(private activatedRoute: ActivatedRoute, private eventcourseService: EventCourseService, 
    private confirmationService: ConfirmationService, private threadService: ThreadService) { }

  ngOnInit(): void {
    this.initData()
  }

  async initData(): Promise<void> {
    const result = await firstValueFrom(this.activatedRoute.params.pipe(map(result=>result)))
    this.idEvent = (result as any).id

    this.eventCourse = await firstValueFrom(this.eventcourseService.getByIdEventCourse(this.idEvent))
    this.dataEventCourse = this.eventCourse.data
    this.orderData = await firstValueFrom(this.eventcourseService.getOrderEventCourse(this.idEvent))
    this.orders = this.orderData.data
    this.article = await firstValueFrom(this.threadService.getArticleActiveWithPage(this.idType, 0,2, true))
    this.dataArticle = this.article.data
  }

  timeFormatter(time: Date): String {
    return moment(time).calendar()
  }

  confirm(idOrder: string) {
    this.confirmationService.confirm({
      message: `Are you sure that you want to confirm this payment ?`,
      header: 'Confirmation',
      icon: 'pi pi-check-circle',
      accept: () => {
        this.confirmPayment(idOrder)
      },
      reject: () => {
        this.initData()
      }
    });
  }

  async confirmPayment(idOrder: string): Promise<void> {
    this.dataConfirm = await firstValueFrom(this.eventcourseService.confirmPayJoin(idOrder))
    if(this.dataConfirm.data){
      this.initData()
    }
  }

}
