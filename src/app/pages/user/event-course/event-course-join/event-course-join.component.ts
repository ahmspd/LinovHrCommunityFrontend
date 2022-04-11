import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PayJoinEventCourseDtoReq } from 'src/app/dto/event-course/pay-join-event-course-dto-req';
import { GetAllPaymentMethodDtoDataRes } from 'src/app/dto/payment-method/get-all-payment-method-dto-data-res';
import { EventCourseService } from 'src/app/service/event-course.service';
import { OrderService } from 'src/app/service/order.service';
import { PaymentMethodService } from 'src/app/service/payment-method.service';

@Component({
  selector: 'app-event-course-join',
  templateUrl: './event-course-join.component.html',
  styleUrls: ['./event-course-join.component.scss']
})
export class EventCourseJoinComponent implements OnInit, OnDestroy {

  paymentMethods: GetAllPaymentMethodDtoDataRes[] = []
  idEvent!: string
  insertPayment: PayJoinEventCourseDtoReq = new PayJoinEventCourseDtoReq()
  activatedRouteSubs?: Subscription
  getByIdOrderSubs?: Subscription
  getAllPaymentMethodSubs?: Subscription
  insertPaymentSubs?: Subscription
  joinSubscription?: Subscription
  file?: File

  constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService, private router: Router, 
    private paymentMethodService: PaymentMethodService, private eventCourseService: EventCourseService) { }

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    this.activatedRouteSubs = this.activatedRoute.params.subscribe(result => {
      this.idEvent = (result as any).id
    })

    this.getAllPaymentMethodSubs = this.paymentMethodService.findAll().subscribe(result => {
      this.paymentMethods = result.data
    })
  }

  changeFile(event: any): void {
    this.file = event[0]
  }

  submit(): void {
    this.joinSubscription = this.eventCourseService.joinEventCourse(this.idEvent).subscribe(result => {
      const idOrder: string = result.data.id
      this.insertPayment.idOrder = idOrder
      this.insertPaymentSubs = this.eventCourseService.pay(this.insertPayment, this.file).subscribe(_ => {
        this.router.navigateByUrl('/event-course/list')
      })
    }) 

  }

  ngOnDestroy(): void {
      this.activatedRouteSubs.unsubscribe()
      this.getByIdOrderSubs.unsubscribe()
      this.getAllPaymentMethodSubs.unsubscribe()
      this.insertPaymentSubs.unsubscribe()
      this.joinSubscription.unsubscribe()
  }

}
