import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DeleteByIdPriceTypeDtoRes } from "../dto/price-type/delete-by-id-price-type-dto-res";
import { DeleteMultiplePriceTypeDtoReq } from "../dto/price-type/delete-multiple-price-type-dto-req";
import { DeleteMultiplePriceTypeDtoRes } from "../dto/price-type/delete-multiple-price-type-dto-res";
import { GetAllPriceTypeDtoDataRes } from "../dto/price-type/get-all-price-type-dto-data-res";
import { GetAllPriceTypeDtoRes } from "../dto/price-type/get-all-price-type-dto-res";
import { GetAllPriceTypePageDtoRes } from "../dto/price-type/get-all-price-type-page-dto-res";
import { GetByIdPriceTypeDtoRes } from "../dto/price-type/get-by-id-price-type-dto-res";
import { InsertPriceTypeDtoReq } from "../dto/price-type/insert-price-type-dto-req";
import { InsertPriceTypeDtoRes } from "../dto/price-type/insert-price-type-dto-res";
import { UpdatePriceTypeDtoReq } from "../dto/price-type/update-price-type-dto-req";
import { UpdatePriceTypeDtoRes } from "../dto/price-type/update-price-type-dto-res";
import { DeleteByIdThreadTypeRes } from "../dto/thread-type/delete-by-id-thread-type-res";
import { DeleteMultipleThreadTypeDtoReq } from "../dto/thread-type/delete-multiple-thread-type-dto-req";
import { DeleteMultipleThreadTypeDtoRes } from "../dto/thread-type/delete-multiple-thread-type-dto-res";
import { GetAllThreadTypeDtoRes } from "../dto/thread-type/get-all-thread-type-dto-res";
import { GetAllThreadTypePageDtoRes } from "../dto/thread-type/get-all-thread-type-page-dto-res";
import { GetByIdThreadTypeDtoRes } from "../dto/thread-type/get-by-id-thread-type-dto-res";
import { InsertThreadTypeDtoReq } from "../dto/thread-type/insert-thread-type-dto-req";
import { InsertThreadTypeDtoRes } from "../dto/thread-type/insert-thread-type-dto-res";
import { UpdateThreadTypeDtoReq } from "../dto/thread-type/update-thread-type-dto-req";
import { UpdateThreadTypeDtoRes } from "../dto/thread-type/update-thread-type-dto-res";

@Injectable({
    providedIn: 'root'
})
export class ThreadTypeService {

    constructor(private http: HttpClient) {
    }

    getAll(startPage : number, maxPage : number): Observable<GetAllThreadTypePageDtoRes> {
        return this.http.get<GetAllThreadTypePageDtoRes>(`http://localhost:1234/thread-types/page?start=${startPage}&max=${maxPage}`)
    }

    getAllPriceType(): Observable<GetAllThreadTypeDtoRes> {
        return this.http.get<GetAllThreadTypeDtoRes>(`http://localhost:1234/thread-types`)
    }

    insert(data: InsertThreadTypeDtoReq): Observable<InsertThreadTypeDtoRes> {
        return this.http.post<InsertThreadTypeDtoRes>('http://localhost:1234/thread-types', data)
    }
 
    update(position: UpdateThreadTypeDtoReq): Observable<UpdateThreadTypeDtoRes> {
        return this.http.put<UpdateThreadTypeDtoRes>('http://localhost:1234/thread-types', position)
    }
    
    getById(id: string): Observable<GetByIdThreadTypeDtoRes> {
        return this.http.get<GetByIdThreadTypeDtoRes>(`http://localhost:1234/thread-types/${id}`)
    }

    deleteById(id: string): Observable<DeleteByIdThreadTypeRes> {
        return this.http.delete<DeleteByIdThreadTypeRes>(`http://localhost:1234/thread-types/${id}`)
    }

    deleteMultiple(data: DeleteMultipleThreadTypeDtoReq): Observable<DeleteMultipleThreadTypeDtoRes> {
        return this.http.post<DeleteMultipleThreadTypeDtoRes>('http://localhost:1234/thread-types/multiple', data)
    }
}