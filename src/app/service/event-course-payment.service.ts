import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetAllEventCoursePaymentDtoRes } from "../dto/event-course-payment/get-all-event-course-payment-dto-res";
import { GetReportEventCoursePaymentDtoRes } from "../dto/event-course-payment/get-report-event-course-payment-dto-res";
import { InsertEventCoursePaymentDtoReq } from "../dto/event-course-payment/insert-event-course-payment-dto-req";
import { InsertEventCoursePaymentDtoRes } from "../dto/event-course-payment/insert-event-course-payment-dto-res";
import { UpdateEventCoursePaymentDtoReq } from "../dto/event-course-payment/update-event-course-payment-dto-req";
import { UpdateEventCoursePaymentDtoRes } from "../dto/event-course-payment/update-event-course-payment-dto-res";

@Injectable({
    providedIn: 'root'
})
export class EventCoursePaymentService {

    constructor(private http: HttpClient) {
    }

    pay(data: InsertEventCoursePaymentDtoReq, file?: File): Observable<InsertEventCoursePaymentDtoRes> {
        const formData: FormData = new FormData()
        formData.append('content', JSON.stringify(data))
        if (file) {
            formData.append('file', file)
        }
        return this.http.post<InsertEventCoursePaymentDtoRes>(`http://localhost:1234/event-course-payment`, formData)
    }

    confirmPayment(updateData: UpdateEventCoursePaymentDtoReq): Observable<UpdateEventCoursePaymentDtoRes> {
        return this.http.put<UpdateEventCoursePaymentDtoRes>(`http://localhost:1234/event-course-payment`, updateData)
    }
    
    getAllUnAccepted(isAccept : boolean, startPage: number, maxPage: number): Observable<GetAllEventCoursePaymentDtoRes> {
        return this.http.get<GetAllEventCoursePaymentDtoRes>(`http://localhost:1234/event-course-payment?isAccept=${isAccept}&start=${startPage}&max=${maxPage}`)
    }

    getReportPaymentByAdmin(startPage: number, maxPage: number): Observable<GetReportEventCoursePaymentDtoRes> {
        return this.http.get<GetReportEventCoursePaymentDtoRes>(`http://localhost:1234/event-course-payment/page/report/admin/payment?start=${startPage}&max=${maxPage}`)
    }
}