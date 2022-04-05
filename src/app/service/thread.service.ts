import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { InsertThreadDetailDtoReq } from "../dto/thread-detail/insert-thread-detail-dto-req";
import { InsertThreadDetailDtoRes } from "../dto/thread-detail/insert-thread-detail-dto-res";
import { GetThreadDetailDtoRes } from "../dto/thread/get-thread-detail-dto-res";
import { GetThreadDtoRes } from "../dto/thread/get-thread-dto-res";
import { InsertThreadDtoReq } from "../dto/thread/insert-thread-dto-req";
import { InsertThreadDtoRes } from "../dto/thread/insert-thread-dto-res";

@Injectable({
    providedIn: 'root'
})
export class ThreadService {

    constructor(private http: HttpClient) {
    }

    insert(data : InsertThreadDtoReq,file?:File) : Observable<InsertThreadDtoRes>{
        const formData: FormData = new FormData()
        formData.append('content', JSON.stringify(data))
        if(file){
            formData.append('file', file)
        }
        return this.http.post<InsertThreadDtoRes>(`http://localhost:1234/threads`,formData)
    }

    getThread() : Observable<GetThreadDtoRes>{
        return this.http.get<GetThreadDtoRes>(`http://localhost:1234/threads`)
    }

    getThreadByType(id : string) : Observable<GetThreadDtoRes>{
        return this.http.get<GetThreadDtoRes>(`http://localhost:1234/threads/type/${id}`)
    }

    getThreadDetail(id : String) : Observable<GetThreadDetailDtoRes>{
        return this.http.get<GetThreadDetailDtoRes>(`http://localhost:1234/threads/detail/${id}`)
    }

    insertComment(data : InsertThreadDetailDtoReq) : Observable<InsertThreadDetailDtoRes>{
        return this.http.post<InsertThreadDetailDtoRes>(`http://localhost:1234/thread-details`,data)
    }
}