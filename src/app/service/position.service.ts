import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DeleteByIdPositionDtoRes } from "../dto/position/delete-by-id-position-dto-res";
import { DeleteMultiplePositionDtoReq } from "../dto/position/delete-multiple-position-dto-req";
import { DeleteMultiplePositionDtoRes } from "../dto/position/delete-multiple-position-dto-res";
import { GetAllPositionPageDtoRes } from "../dto/position/get-all-position-page-dto-res";
import { GetByIdPositionDtoRes } from "../dto/position/get-by-id-position-dto-res";
import { InsertPositionDtoReq } from "../dto/position/insert-position-dto-req";
import { InsertPositionDtoRes } from "../dto/position/insert-position-dto-res";
import { UpdatePositionDtoReq } from "../dto/position/update-position-dto-req";
import { UpdatePositionDtoRes } from "../dto/position/update-position-dto-res";

@Injectable({
    providedIn: 'root'
})
export class PositionService {

    constructor(private http: HttpClient) {
    }

    getAll(startPage : number, maxPage : number): Observable<GetAllPositionPageDtoRes> {
        return this.http.get<GetAllPositionPageDtoRes>(`http://localhost:1234/positions/page?start=${startPage}&max=${maxPage}`)
    }

    insert(position: InsertPositionDtoReq): Observable<InsertPositionDtoRes> {
        return this.http.post<InsertPositionDtoRes>('http://localhost:1234/positions', position)
    }
 
    update(position: UpdatePositionDtoReq): Observable<UpdatePositionDtoRes> {
        return this.http.put<UpdatePositionDtoRes>('http://localhost:1234/positions', position)
    }
    
    getById(id: string): Observable<GetByIdPositionDtoRes> {
        return this.http.get<GetByIdPositionDtoRes>(`http://localhost:1234/positions/${id}`)
    }

    deleteById(id: string): Observable<DeleteByIdPositionDtoRes> {
        return this.http.delete<DeleteByIdPositionDtoRes>(`http://localhost:1234/positions/${id}`)
    }

    deleteMultiple(position: DeleteMultiplePositionDtoReq): Observable<DeleteMultiplePositionDtoRes> {
        return this.http.post<DeleteMultiplePositionDtoRes>('http://localhost:1234/positions/multiple', position)
    }
}