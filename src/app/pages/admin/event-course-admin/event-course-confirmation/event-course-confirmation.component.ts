import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { GetAllEventCoursePaymentDtoDataRes } from 'src/app/dto/event-course-payment/get-all-event-course-payment-dto-data-res';
import { GetAllEventCoursePaymentDtoRes } from 'src/app/dto/event-course-payment/get-all-event-course-payment-dto-res';
import { UpdateEventCoursePaymentDtoReq } from 'src/app/dto/event-course-payment/update-event-course-payment-dto-req';
import { UpdateEventCoursePaymentDtoRes } from 'src/app/dto/event-course-payment/update-event-course-payment-dto-res';
import { EventCoursePaymentService } from 'src/app/service/event-course-payment.service';

@Component({
  selector: 'app-event-course-confirmation',
  templateUrl: './event-course-confirmation.component.html',
  styleUrls: ['./event-course-confirmation.component.scss'],
  providers: [ConfirmationService]
})
export class EventCourseConfirmationComponent implements OnInit {

  constructor(private eventCoursePaymentService: EventCoursePaymentService, private router: Router, private confirmationService: ConfirmationService) { }

  confirmPayment: UpdateEventCoursePaymentDtoReq = new UpdateEventCoursePaymentDtoReq()
  payments: GetAllEventCoursePaymentDtoDataRes[] = []
  paymentData : GetAllEventCoursePaymentDtoRes

  paymentUpdate : UpdateEventCoursePaymentDtoRes

  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true
  isAccept: boolean = false

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
  }

  loadData(event: LazyLoadEvent) {
    console.log(event)
    this.getData(event.first, event.rows)
  }

  async getData(startPage: number = 0, maxPage: number = this.maxPage): Promise<void> {
    this.loading = true;

    try {
      this.paymentData = await firstValueFrom(this.eventCoursePaymentService.getAllUnAccepted(this.isAccept, startPage, maxPage))
      this.payments = this.paymentData.data
      this.loading = false
      this.totalRecords = this.paymentData.total
    }
    catch(error){
      this.loading = false
    }
  }

  confirm(idPayment: string): void {
    this.confirmPayment.id = idPayment
    this.confirmationService.confirm({
      key: 'confirm',
      message: 'Are you sure to confirm this payment?',
      accept: () => {
        this.UpdateData() 
      },
      reject: () => {
        this.initData()
      }
    });
  }
  
  async UpdateData() : Promise<void>{
    this.paymentUpdate = await firstValueFrom(this.eventCoursePaymentService.confirmPayment(this.confirmPayment))
    if(this.paymentUpdate.data){
      this.getData()
    }
  }

  priceFormatter(price: any): String {
    return price.toLocaleString('en-ID',{style: 'currency', currency: 'IDR'})
  }

}
