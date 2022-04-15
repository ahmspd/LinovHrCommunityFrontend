import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetDashboardDtoRes } from "../dto/dashboard/get-dashboard-dto-res";

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private http: HttpClient) {
    }

    getDataDashboard(): Observable<GetDashboardDtoRes> {
        return this.http.get<GetDashboardDtoRes>(`http://localhost:1234/dashboard`)
    }
}