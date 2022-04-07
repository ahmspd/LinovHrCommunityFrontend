import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DeleteByIdPaymentMethodRes } from "../dto/payment-method/delete-by-id-payment-method-res";
import { DeleteMultiplePaymentMethodDtoReq } from "../dto/payment-method/delete-multiple-payment-method-dto-req";
import { DeleteMultiplePaymentMethodDtoRes } from "../dto/payment-method/delete-multiple-payment-method-dto-res";
import { GetAllPaymentMethodDtoRes } from "../dto/payment-method/get-all-payment-method-dto-res";
import { GetAllPaymentMethodPageDtoRes } from "../dto/payment-method/get-all-payment-method-page-dto-res";
import { InsertPaymentMethodDtoReq } from "../dto/payment-method/insert-payment-method-dto-req";
import { InsertPaymentMethodDtoRes } from "../dto/payment-method/insert-payment-method-dto-res";
import { UpdatePaymentMethodDtoReq } from "../dto/payment-method/update-payment-method-dto-req";
import { UpdatePaymentMethodDtoRes } from "../dto/payment-method/update-payment-method-dto-res";
import { GetByIdPositionDtoRes } from "../dto/position/get-by-id-position-dto-res";
import { UpdatePositionDtoRes } from "../dto/position/update-position-dto-res";

@Injectable({
    providedIn: 'root'
})
export class PaymentMethodService {

    constructor(private http: HttpClient) {
    }

    getAll(startPage : number, maxPage : number): Observable<GetAllPaymentMethodPageDtoRes> {
        return this.http.get<GetAllPaymentMethodPageDtoRes>(`http://localhost:1234/payment-methods/page?start=${startPage}&max=${maxPage}`)
    }

    findAll(): Observable<GetAllPaymentMethodDtoRes> {
        return this.http.get<GetAllPaymentMethodPageDtoRes>('http://localhost:1234/payment-methods')
    }

    insert(data: InsertPaymentMethodDtoReq): Observable<InsertPaymentMethodDtoRes> {
        return this.http.post<InsertPaymentMethodDtoRes>('http://localhost:1234/payment-methods', data)
    }
 
    update(position: UpdatePaymentMethodDtoReq): Observable<UpdatePaymentMethodDtoRes> {
        return this.http.put<UpdatePaymentMethodDtoRes>('http://localhost:1234/payment-methods', position)
    }
    
    getById(id: string): Observable<GetByIdPositionDtoRes> {
        return this.http.get<GetByIdPositionDtoRes>(`http://localhost:1234/payment-methods/${id}`)
    }

    deleteById(id: string): Observable<DeleteByIdPaymentMethodRes> {
        return this.http.delete<DeleteByIdPaymentMethodRes>(`http://localhost:1234/payment-methods/${id}`)
    }

    deleteMultiple(data: DeleteMultiplePaymentMethodDtoReq): Observable<DeleteMultiplePaymentMethodDtoRes> {
        return this.http.post<DeleteMultiplePaymentMethodDtoRes>('http://localhost:1234/payment-methods/multiple', data)
    }
}