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

@Injectable({
    providedIn: 'root'
})
export class PriceTypeService {

    constructor(private http: HttpClient) {
    }

    getAll(startPage : number, maxPage : number): Observable<GetAllPriceTypePageDtoRes> {
        return this.http.get<GetAllPriceTypePageDtoRes>(`http://localhost:1234/price-types/page?start=${startPage}&max=${maxPage}`)
    }

    getAllPriceType(): Observable<GetAllPriceTypeDtoRes> {
        return this.http.get<GetAllPriceTypeDtoRes>(`http://localhost:1234/price-types`)
    }

    insert(data: InsertPriceTypeDtoReq): Observable<InsertPriceTypeDtoRes> {
        return this.http.post<InsertPriceTypeDtoRes>('http://localhost:1234/price-types', data)
    }
 
    update(position: UpdatePriceTypeDtoReq): Observable<UpdatePriceTypeDtoRes> {
        return this.http.put<UpdatePriceTypeDtoRes>('http://localhost:1234/price-types', position)
    }
    
    getById(id: string): Observable<GetByIdPriceTypeDtoRes> {
        return this.http.get<GetByIdPriceTypeDtoRes>(`http://localhost:1234/price-types/${id}`)
    }

    deleteById(id: string): Observable<DeleteByIdPriceTypeDtoRes> {
        return this.http.delete<DeleteByIdPriceTypeDtoRes>(`http://localhost:1234/price-types/${id}`)
    }

    deleteMultiple(data: DeleteMultiplePriceTypeDtoReq): Observable<DeleteMultiplePriceTypeDtoRes> {
        return this.http.post<DeleteMultiplePriceTypeDtoRes>('http://localhost:1234/price-types/multiple', data)
    }
}