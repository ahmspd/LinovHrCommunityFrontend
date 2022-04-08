import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetOrderEventCourseDtoDataRes } from 'src/app/dto/event-course/get-order-event-course-dto-data-res';
import { EventCourseService } from 'src/app/service/event-course.service';
import * as moment from 'moment';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-event-course-order-list',
  templateUrl: './event-course-order-list.component.html',
  styleUrls: ['./event-course-order-list.component.scss'],
  providers: [ConfirmationService]
})
export class EventCourseOrderListComponent implements OnInit, OnDestroy {

  idEvent: String
  orders: GetOrderEventCourseDtoDataRes[] = []
  activatedRouteSubs: Subscription
  getOrderEventCourseSubs: Subscription
  confirmPaymentEventCourseSubs: Subscription

  constructor(private activatedRoute: ActivatedRoute, private eventcourseService: EventCourseService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    this.activatedRouteSubs = this.activatedRoute.params.subscribe(result => {
      this.idEvent = (result as any).id
    })

    this.getOrderEventCourseSubs = this.eventcourseService.getOrderEventCourse(this.idEvent).subscribe(result => {
      this.orders = result.data
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
