import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DeleteByIdIndustryDtoRes } from "../dto/industry/delete-by-id-industry-dto-res";
import { DeleteMultipleIndustryDtoReq } from "../dto/industry/delete-multiple-industry-dto-req";
import { DeleteMultipleIndustryDtoRes } from "../dto/industry/delete-multiple-industry-dto-res";
import { GetAllIndustryPageDtoRes } from "../dto/industry/get-all-industry-page-dto-res";
import { GetByIdIndustryDtoRes } from "../dto/industry/get-by-id-industry-dto-res";
import { InsertIndustryDtoReq } from "../dto/industry/insert-industry-dto-req";
import { InsertIndustryDtoRes } from "../dto/industry/insert-industry-dto-res";
import { UpdateIndustryDtoReq } from "../dto/industry/update-industry-dto-req";
import { UpdateIndustryDtoRes } from "../dto/industry/update-industry-dto-res";

@Injectable({
    providedIn: 'root'
})
export class IndustryService {

    constructor(private http: HttpClient) {
    }

    getAll(startPage : number, maxPage : number): Observable<GetAllIndustryPageDtoRes> {
        return this.http.get<GetAllIndustryPageDtoRes>(`http://localhost:1234/industries/page?start=${startPage}&max=${maxPage}`)
    }

    insert(industry: InsertIndustryDtoReq): Observable<InsertIndustryDtoRes> {
        return this.http.post<InsertIndustryDtoRes>('http://localhost:1234/industries', industry)
    }
 
    update(industry: UpdateIndustryDtoReq): Observable<UpdateIndustryDtoRes> {
        return this.http.put<UpdateIndustryDtoRes>('http://localhost:1234/industries', industry)
    }
    
    getById(id: string): Observable<GetByIdIndustryDtoRes> {
        return this.http.get<GetByIdIndustryDtoRes>(`http://localhost:1234/industries/${id}`)
    }

    deleteById(id: string): Observable<DeleteByIdIndustryDtoRes> {
        return this.http.delete<DeleteByIdIndustryDtoRes>(`http://localhost:1234/industries/${id}`)
    }

    deleteMultiple(industry: DeleteMultipleIndustryDtoReq): Observable<DeleteMultipleIndustryDtoRes> {
        return this.http.post<DeleteMultipleIndustryDtoRes>('http://localhost:1234/industries/multiple', industry)
    }
}