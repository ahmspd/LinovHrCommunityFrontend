import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map, Subscription } from 'rxjs';
import { GetByIdEventCourseDtoDataRes } from 'src/app/dto/event-course/get-by-id-event-course-dto-data-res';
import { PayJoinEventCourseDtoReq } from 'src/app/dto/event-course/pay-join-event-course-dto-req';
import { GetAllPaymentMethodDtoDataRes } from 'src/app/dto/payment-method/get-all-payment-method-dto-data-res';
import { EventCourseService } from 'src/app/service/event-course.service';
import { OrderService } from 'src/app/service/order.service';
import { PaymentMethodService } from 'src/app/service/payment-method.service';
import * as moment from 'moment';
import { GetAllPaymentMethodDtoRes } from 'src/app/dto/payment-method/get-all-payment-method-dto-res';
import { GetByIdEventCourseDtoRes } from 'src/app/dto/event-course/get-by-id-event-course-dto-res';
import { JoinEventCourseDtoRes } from 'src/app/dto/event-course/join-event-course-dto-res';
import { PayJoinEventCourseDtoRes } from 'src/app/dto/event-course/pay-join-event-course-dto-res';

@Component({
  selector: 'app-event-course-join',
  templateUrl: './event-course-join.component.html',
  styleUrls: ['./event-course-join.component.scss']
})
export class EventCourseJoinComponent implements OnInit {

  paymentMethods: GetAllPaymentMethodDtoDataRes[] = []
  paymentMethodData: GetAllPaymentMethodDtoRes
  eventCourse: GetByIdEventCourseDtoDataRes = new GetByIdEventCourseDtoDataRes()
  eventCourseData: GetByIdEventCourseDtoRes
  insertPayment: PayJoinEventCourseDtoReq = new PayJoinEventCourseDtoReq()

  insertData : JoinEventCourseDtoRes
  payData : PayJoinEventCourseDtoRes
  idEvent!: string
  file?: File

  constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService, private router: Router, 
    private paymentMethodService: PaymentMethodService, private eventCourseService: EventCourseService) { }

  ngOnInit(): void {
    this.initData()
  }

  async initData(): Promise<void> {
    const result = await firstValueFrom(this.activatedRoute.params.pipe(map(result=>result)))
    this.idEvent = (result as any).id

    this.paymentMethodData = await firstValueFrom(this.paymentMethodService.findAll())
    this.paymentMethods = this.paymentMethodData.data

    this.eventCourseData = await firstValueFrom(this.eventCourseService.getByIdEventCourse(this.idEvent))
    this.eventCourse = this.eventCourseData.data
  }

  changeFile(event: any): void {
    this.file = event[0]
  }

  async submit(): Promise<void> {
    this.insertData = await firstValueFrom(this.eventCourseService.joinEventCourse(this.idEvent))
    if(this.insertData.data){
      this.insertPayment.idOrder = this.insertData.data.id
      this.payData = await firstValueFrom(this.eventCourseService.pay(this.insertPayment, this.file))
      if(this.payData.data){
        this.router.navigateByUrl('/event-course/list')
      }
    }

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

}
