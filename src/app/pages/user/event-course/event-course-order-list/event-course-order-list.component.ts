import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetOrderEventCourseDtoDataRes } from 'src/app/dto/event-course/get-order-event-course-dto-data-res';
import { EventCourseService } from 'src/app/service/event-course.service';
import * as moment from 'moment';
import { ConfirmationService } from 'primeng/api';
import { GetAllThreadPageDtoRes } from 'src/app/dto/thread/get-all-thread-page-dto-res';
import { ThreadService } from 'src/app/service/thread.service';
import { GetThreadDataDtoRes } from 'src/app/dto/thread/get-thread-data-dto-res';
import { GetByIdEventCourseDtoDataRes } from 'src/app/dto/event-course/get-by-id-event-course-dto-data-res';

@Component({
  selector: 'app-event-course-order-list',
  templateUrl: './event-course-order-list.component.html',
  styleUrls: ['./event-course-order-list.component.scss'],
  providers: [ConfirmationService]
})
export class EventCourseOrderListComponent implements OnInit, OnDestroy {

  orders: GetOrderEventCourseDtoDataRes[] = []
  dataArticle: GetThreadDataDtoRes[] = []
  dataEventCourse: GetByIdEventCourseDtoDataRes = new GetByIdEventCourseDtoDataRes()
  activatedRouteSubs: Subscription
  dataEventCourseSubs: Subscription
  getOrderEventCourseSubs: Subscription
  confirmPaymentEventCourseSubs: Subscription
  getAllArticleSubscription?: Subscription
  idEvent: String
  idType: string = '2'

  constructor(private activatedRoute: ActivatedRoute, private eventcourseService: EventCourseService, 
    private confirmationService: ConfirmationService, private threadService: ThreadService) { }

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    this.activatedRouteSubs = this.activatedRoute.params.subscribe(result => {
      this.idEvent = (result as any).id
    })

    this.dataEventCourseSubs = this.eventcourseService.getByIdEventCourse(this.idEvent).subscribe(result => {
      this.dataEventCourse = result.data
    })

    this.getOrderEventCourseSubs = this.eventcourseService.getOrderEventCourse(this.idEvent).subscribe(result => {
      this.orders = result.data
    })

    this.getAllArticleSubscription = this.threadService.getArticleActiveWithPage(this.idType, 0, 2, true).subscribe(result => {
      this.dataArticle = result.data
    })
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

  confirmPayment(idOrder: string): void {
    this.confirmPaymentEventCourseSubs = this.eventcourseService.confirmPayJoin(idOrder).subscribe(_ => {
      this.initData()
    })
  }

  ngOnDestroy(): void {
    this.activatedRouteSubs?.unsubscribe()
    this.getOrderEventCourseSubs?.unsubscribe()
    this.confirmPaymentEventCourseSubs?.unsubscribe()
  }

}
