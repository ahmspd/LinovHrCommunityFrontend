import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetAllProvinceDtoRes } from "../dto/province/get-all-province-dto-res";

@Injectable({
    providedIn: 'root'
})
export class ProvinceService {

    constructor(private http: HttpClient) {
    }

    getAllProvince(): Observable<GetAllProvinceDtoRes> {
        return this.http.get<GetAllProvinceDtoRes>(`http://localhost:1234/provinces`)
    }
}