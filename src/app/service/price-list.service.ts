import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DeleteByIdPriceListDtoRes } from "../dto/price-list/delete-by-id-price-list-dto-res";
import { DeleteMultiplePriceListDtoReq } from "../dto/price-list/delete-multiple-price-list-dto-req";
import { DeleteMultiplePriceListDtoRes } from "../dto/price-list/delete-multiple-price-list-dto-res";
import { GetAllPriceListPageDtoRes } from "../dto/price-list/get-all-price-list-page-dto-res";
import { GetByIdPriceListDtoRes } from "../dto/price-list/get-by-id-price-list-dto-res";
import { InsertPriceListDtoRes } from "../dto/price-list/insert-price-list-dto-res";
import { UpdatePriceListDtoRes } from "../dto/price-list/update-price-list-dto-res";
import { InsertPriceTypeDtoReq } from "../dto/price-type/insert-price-type-dto-req";
import { UpdatePriceTypeDtoReq } from "../dto/price-type/update-price-type-dto-req";

@Injectable({
    providedIn: 'root'
})
export class PriceListService {

    constructor(private http: HttpClient) {
    }

    getAll(startPage : number, maxPage : number): Observable<GetAllPriceListPageDtoRes> {
        return this.http.get<GetAllPriceListPageDtoRes>(`http://localhost:1234/price-list/page?start=${startPage}&max=${maxPage}`)
    }

    insert(data: InsertPriceTypeDtoReq): Observable<InsertPriceListDtoRes> {
        return this.http.post<InsertPriceListDtoRes>('http://localhost:1234/price-list', data)
    }
 
    update(position: UpdatePriceTypeDtoReq): Observable<UpdatePriceListDtoRes> {
        return this.http.put<UpdatePriceListDtoRes>('http://localhost:1234/price-list', position)
    }
    
    getById(id: string): Observable<GetByIdPriceListDtoRes> {
        return this.http.get<GetByIdPriceListDtoRes>(`http://localhost:1234/price-list/${id}`)
    }

    deleteById(id: string): Observable<DeleteByIdPriceListDtoRes> {
        return this.http.delete<DeleteByIdPriceListDtoRes>(`http://localhost:1234/price-list/${id}`)
    }

    deleteMultiple(data: DeleteMultiplePriceListDtoReq): Observable<DeleteMultiplePriceListDtoRes> {
        return this.http.post<DeleteMultiplePriceListDtoRes>('http://localhost:1234/price-list/multiple', data)
    }
}