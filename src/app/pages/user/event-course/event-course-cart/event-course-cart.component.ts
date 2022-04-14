import { Component, OnDestroy, OnInit } from '@angular/core';
import { firstValueFrom, Subscription } from 'rxjs';
import { GetAllEventCoursePaymentDetailDtoDataRes } from 'src/app/dto/event-course-payment-detail/get-all-event-course-payment-detail-dto-data-res';
import { EventCoursePaymentDetailService } from 'src/app/service/event-course-payment-detail.service';
import * as moment from 'moment';
import { InsertEventCoursePaymentDtoReq } from 'src/app/dto/event-course-payment/insert-event-course-payment-dto-req';
import { GetIdAndPriceDtoDataRes } from 'src/app/dto/event-course-payment-detail/get-id-and-price-dto-data-res';
import { PaymentMethodService } from 'src/app/service/payment-method.service';
import { GetAllPaymentMethodDtoDataRes } from 'src/app/dto/payment-method/get-all-payment-method-dto-data-res';
import { EventCoursePaymentService } from 'src/app/service/event-course-payment.service';
import { Router } from '@angular/router';
import { GetAllPaymentMethodDtoRes } from 'src/app/dto/payment-method/get-all-payment-method-dto-res';
import { GetAllEventCoursePaymentDetailDtoRes } from 'src/app/dto/event-course-payment-detail/get-all-event-course-payment-detail-dto-res';
import { InsertEventCoursePaymentDtoRes } from 'src/app/dto/event-course-payment/insert-event-course-payment-dto-res';

@Component({
  selector: 'app-event-course-cart',
  templateUrl: './event-course-cart.component.html',
  styleUrls: ['./event-course-cart.component.scss']
})
export class EventCourseCartComponent implements OnInit {

  insertPayment: InsertEventCoursePaymentDtoReq = new InsertEventCoursePaymentDtoReq()
  paymentMethods: GetAllPaymentMethodDtoDataRes[] = []
  paymentMethodsData : GetAllPaymentMethodDtoRes

  unpaidEventCourses: GetAllEventCoursePaymentDetailDtoDataRes[] = []
  unpaidEventCourseData : GetAllEventCoursePaymentDetailDtoRes

  insertPaymentData : InsertEventCoursePaymentDtoRes

  idAndPrices: GetIdAndPriceDtoDataRes[] = []
  totalPrice: number = 0
  file?: File
  
  constructor(private eventCoursePaymentDetailService: EventCoursePaymentDetailService, private eventCoursePaymentService: EventCoursePaymentService,
    private paymentMethodService: PaymentMethodService, private router: Router) { }

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    this.getData()
  }

  async getData(): Promise<void> {
    this.paymentMethodsData = await firstValueFrom(this.paymentMethodService.findAll())
    this.paymentMethods = this.paymentMethodsData.data
    this.unpaidEventCourseData = await firstValueFrom(this.eventCoursePaymentDetailService.getUnpaidEventCourse())
    this.unpaidEventCourses = this.unpaidEventCourseData.data
  }

  dateFormatter(date: moment.MomentInput): String {
    return moment(date).format('ddd, DD MMM YY')
  }

  timeFormatter(time: String): String {
    return time.substring(0, 5)
  }

  getTotal(): string {
    let sum: number = 0
    for (let i = 0; i < this.idAndPrices.length; i++) {
      sum += this.idAndPrices[i].price
    }
    return sum.toLocaleString('en-ID',{style: 'currency', currency: 'IDR'})
  }

  priceFormatter(price: any): String {
    return price.toLocaleString('en-ID',{style: 'currency', currency: 'IDR'})
  }

  onChange(data: GetIdAndPriceDtoDataRes, isChecked: boolean) {
    if (isChecked) {
      this.idAndPrices.push(data);
    } else {
      const index = this.idAndPrices.findIndex(x => x.id == data.id)
      this.idAndPrices.splice(index, 1);
    }
  }

  changeFile(event: any): void {
    this.file = event[0]
  }

  removeFile(): void {
    this.file = null
  }

  async pay(): Promise<void> {
    this.insertPayment.idEvenCoursePaymentDetails = []
    this.idAndPrices.forEach(idAndPrice => {
      this.insertPayment.idEvenCoursePaymentDetails.push(idAndPrice.id)
      this.totalPrice += idAndPrice.price
    })
    this.insertPayment.totalPrice = this.totalPrice
    this.insertPaymentData = await firstValueFrom(this.eventCoursePaymentService.pay(this.insertPayment, this.file))
    if(this.insertPaymentData.data){
      this.router.navigateByUrl('/user/setting/event-course')
    }
  }

}
