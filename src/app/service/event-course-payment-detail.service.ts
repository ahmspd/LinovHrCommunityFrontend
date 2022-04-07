import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetAllEventCoursePaymentDetailDtoRes } from "../dto/event-course-payment-detail/get-all-event-course-payment-detail-dto-res";

@Injectable({
    providedIn: 'root'
})
export class EventCoursePaymentDetailService {

    constructor(private http: HttpClient) {
    }

    getUnpaidEventCourse(): Observable<GetAllEventCoursePaymentDetailDtoRes> {
        return this.http.get<GetAllEventCoursePaymentDetailDtoRes>(`http://localhost:1234/event-course-payment-detail`)
    }
}