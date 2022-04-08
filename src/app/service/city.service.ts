import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetAllCityDtoRes } from "../dto/city/get-all-city-dto-res";

@Injectable({
    providedIn: 'root'
})
export class CityService {

    constructor(private http: HttpClient) {
    }

    getAllCity(): Observable<GetAllCityDtoRes> {
        return this.http.get<GetAllCityDtoRes>(`http://localhost:1234/cities`)
    }
}