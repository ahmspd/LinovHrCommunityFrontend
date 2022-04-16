import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfirmPayJoinEventCourseDtoRes } from "../dto/event-course/confirm-pay-join-event-course-dto-res";
import { GetAllEventCourseDtoRes } from "../dto/event-course/get-all-event-course-dto-res";
import { GetByIdEventCourseDtoRes } from "../dto/event-course/get-by-id-event-course-dto-res";
import { GetOrderEventCourseDtoRes } from "../dto/event-course/get-order-event-course-dto-res";
import { GetProfileJoinEventCourseDtoRes } from "../dto/event-course/get-profile-join-event-course-dto-res";
import { GetReportEventCourseByIdRes } from "../dto/event-course/get-report-event-course-by-id-res";
import { InsertEventCourseDtoReq } from "../dto/event-course/insert-event-course-dto-req";
import { InsertEventCourseDtoRes } from "../dto/event-course/insert-event-course-dto-res";
import { JoinEventCourseDtoRes } from "../dto/event-course/join-event-course-dto-res";
import { PayJoinEventCourseDtoReq } from "../dto/event-course/pay-join-event-course-dto-req";
import { PayJoinEventCourseDtoRes } from "../dto/event-course/pay-join-event-course-dto-res";

@Injectable({
    providedIn: 'root'
})
export class EventCourseService {

    constructor(private http: HttpClient) {
    }

    insert(data: InsertEventCourseDtoReq, file?: File): Observable<InsertEventCourseDtoRes> {
        const formData: FormData = new FormData()
        formData.append('content', JSON.stringify(data))
        if (file) {
            formData.append('file', file)
        }
        return this.http.post<InsertEventCourseDtoRes>(`http://localhost:1234/event-course`, formData)
    }

    getActiveEventCourse(type: String, idUser : string): Observable<GetAllEventCourseDtoRes> {
        return this.http.get<GetAllEventCourseDtoRes>(`http://localhost:1234/event-course/type/${type}/${idUser}`)
    }

    getEventCourseByCreatedBy(type: String): Observable<GetAllEventCourseDtoRes> {
        return this.http.get<GetAllEventCourseDtoRes>(`http://localhost:1234/event-course/${type}`)
    }

    getJoinedEventCourse(): Observable<GetAllEventCourseDtoRes> {
        return this.http.get<GetAllEventCourseDtoRes>(`http://localhost:1234/event-course/joined`)
    }

    getProfileJoinedEventCourse(id: String): Observable<GetProfileJoinEventCourseDtoRes> {
        return this.http.get<GetProfileJoinEventCourseDtoRes>(`http://localhost:1234/event-course/profiles/${id}`)
    }

    getByEventCoursePaymentId(id: String): Observable<GetAllEventCourseDtoRes> {
        return this.http.get<GetAllEventCourseDtoRes>(`http://localhost:1234/event-course/detail/${id}`)
    }

    getOrderEventCourse(id: String): Observable<GetOrderEventCourseDtoRes> {
        return this.http.get<GetOrderEventCourseDtoRes>(`http://localhost:1234/event-course/order-list/${id}`)
    }

    getByIdEventCourse(id: String): Observable<GetByIdEventCourseDtoRes> {
        return this.http.get<GetByIdEventCourseDtoRes>(`http://localhost:1234/event-course/id/${id}`)
    }

    joinEventCourse(id: String): Observable<JoinEventCourseDtoRes> {
        return this.http.post<JoinEventCourseDtoRes>(`http://localhost:1234/event-course/join/${id}`, id)
    }

    pay(data: PayJoinEventCourseDtoReq, file?: File): Observable<PayJoinEventCourseDtoRes> {
        const formData: FormData = new FormData()
        formData.append('content', JSON.stringify(data))
        if (file) {
            formData.append('file', file)
        }
        return this.http.put<PayJoinEventCourseDtoRes>(`http://localhost:1234/event-course/pay`, formData)
    }

    confirmPayJoin(id: String): Observable<ConfirmPayJoinEventCourseDtoRes> {
        return this.http.put<ConfirmPayJoinEventCourseDtoRes>(`http://localhost:1234/event-course/confirm/${id}`, id)
    }

    getReportPageUserJoinByAdmin(startPage: number, maxPage: number): Observable<GetReportEventCourseByIdRes> {
        return this.http.get<GetReportEventCourseByIdRes>(`http://localhost:1234/event-course/page/report/admin?start=${startPage}&max=${maxPage}`)
    }
}