import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetAllEventCourseTypeDtoRes } from "../dto/event-course-type/get-all-event-course-type-dto-res";

@Injectable({
    providedIn: 'root'
})
export class EventCourseTypeService {

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<GetAllEventCourseTypeDtoRes> {
        return this.http.get<GetAllEventCourseTypeDtoRes>(`http://localhost:1234/event-course-types`)
    }
}