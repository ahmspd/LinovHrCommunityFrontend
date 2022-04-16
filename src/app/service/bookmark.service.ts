import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DeleteBookmarkDtoRes } from "../dto/bookmark/delete-bookmark-dto-res";
import { GetBookmarkThreadDtoRes } from "../dto/bookmark/get-bookmark-thread-dto-res";
import { InsertBookmarkDtoReq } from "../dto/bookmark/insert-bookmark-dto-req";
import { InsertBookmarkDtoRes } from "../dto/bookmark/insert-bookmark-dto-res";
import { GetAllThreadPageDtoRes } from "../dto/thread/get-all-thread-page-dto-res";

@Injectable({
    providedIn: 'root'
})
export class BookmarkService {

    constructor(private http: HttpClient) {
    }

    getBookmark(idUser : string, idThred : string): Observable<GetBookmarkThreadDtoRes> {
        return this.http.get<GetBookmarkThreadDtoRes>(`http://localhost:1234/bookmarks/${idUser}/${idThred}`)
    }

    insert(data: InsertBookmarkDtoReq): Observable<InsertBookmarkDtoRes> {
        return this.http.post<InsertBookmarkDtoRes>('http://localhost:1234/bookmarks', data)
    }

    getThreadBookmarkByUser(startPage : number, maxPage : number) : Observable<GetAllThreadPageDtoRes>{
        return this.http.get<GetAllThreadPageDtoRes>(`http://localhost:1234/bookmarks/user?start=${startPage}&max=${maxPage}`)
    }

    deleteById(id: string): Observable<DeleteBookmarkDtoRes> {
        return this.http.delete<DeleteBookmarkDtoRes>(`http://localhost:1234/bookmarks/${id}`)
    }

}