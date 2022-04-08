import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetByIdOrderDtoRes } from "../dto/order/get-by-id-order-dto-res";


@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http: HttpClient) {
    }

    getById(id: String): Observable<GetByIdOrderDtoRes> {
        return this.http.get<GetByIdOrderDtoRes>(`http://localhost:1234/orders/${id}`)
    }
}