import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DeleteLikeDtoRes } from "../dto/like/delete-like-dto-res";
import { GetLikeThreadDtoRes } from "../dto/like/get-like-thread-dto-res";
import { InsertLikeDtoReq } from "../dto/like/insert-like-dto-req";
import { InsertLikeDtoRes } from "../dto/like/insert-like-dto-res";
import { GetAllThreadPageDtoRes } from "../dto/thread/get-all-thread-page-dto-res";

@Injectable({
    providedIn: 'root'
})
export class LikeService {

    constructor(private http: HttpClient) {
    }

    getLike(idUser : string, idThred : string): Observable<GetLikeThreadDtoRes> {
        return this.http.get<GetLikeThreadDtoRes>(`http://localhost:1234/likes/${idUser}/${idThred}`)
    }

    insert(data: InsertLikeDtoReq): Observable<InsertLikeDtoRes> {
        return this.http.post<InsertLikeDtoRes>('http://localhost:1234/likes', data)
    }

    deleteById(id: string): Observable<DeleteLikeDtoRes> {
        return this.http.delete<DeleteLikeDtoRes>(`http://localhost:1234/likes/${id}`)
    }

    getThreadLikeByUser(startPage : number, maxPage : number) : Observable<GetAllThreadPageDtoRes>{
        return this.http.get<GetAllThreadPageDtoRes>(`http://localhost:1234/likes/user?start=${startPage}&max=${maxPage}`)
    }

}