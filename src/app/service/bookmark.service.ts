import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DeleteBookmarkDtoRes } from "../dto/bookmark/delete-bookmark-dto-res";
import { GetBookmarkThreadDtoRes } from "../dto/bookmark/get-bookmark-thread-dto-res";
import { InsertBookmarkDtoReq } from "../dto/bookmark/insert-bookmark-dto-req";
import { InsertBookmarkDtoRes } from "../dto/bookmark/insert-bookmark-dto-res";
import { DeleteByIdIndustryDtoRes } from "../dto/industry/delete-by-id-industry-dto-res";
import { DeleteMultipleIndustryDtoReq } from "../dto/industry/delete-multiple-industry-dto-req";
import { DeleteMultipleIndustryDtoRes } from "../dto/industry/delete-multiple-industry-dto-res";
import { GetAllIndustryDtoRes } from "../dto/industry/get-all-industry-dto-res";
import { GetAllIndustryPageDtoRes } from "../dto/industry/get-all-industry-page-dto-res";
import { GetByIdIndustryDtoRes } from "../dto/industry/get-by-id-industry-dto-res";
import { InsertIndustryDtoReq } from "../dto/industry/insert-industry-dto-req";
import { InsertIndustryDtoRes } from "../dto/industry/insert-industry-dto-res";
import { UpdateIndustryDtoReq } from "../dto/industry/update-industry-dto-req";
import { UpdateIndustryDtoRes } from "../dto/industry/update-industry-dto-res";
import { DeleteLikeDtoRes } from "../dto/like/delete-like-dto-res";
import { GetLikeThreadDtoRes } from "../dto/like/get-like-thread-dto-res";
import { InsertLikeDtoReq } from "../dto/like/insert-like-dto-req";
import { InsertLikeDtoRes } from "../dto/like/insert-like-dto-res";

@Injectable({
    providedIn: 'root'
})
export class BookmarkService {

    constructor(private http: HttpClient) {
    }

    // getAll(startPage : number, maxPage : number): Observable<GetAllIndustryPageDtoRes> {
    //     return this.http.get<GetAllIndustryPageDtoRes>(`http://localhost:1234/industries/page?start=${startPage}&max=${maxPage}`)
    // }

    getBookmark(idUser : string, idThred : string): Observable<GetBookmarkThreadDtoRes> {
        return this.http.get<GetBookmarkThreadDtoRes>(`http://localhost:1234/bookmarks/${idUser}/${idThred}`)
    }

    insert(data: InsertBookmarkDtoReq): Observable<InsertBookmarkDtoRes> {
        return this.http.post<InsertBookmarkDtoRes>('http://localhost:1234/bookmarks', data)
    }
 
    // update(industry: UpdateIndustryDtoReq): Observable<UpdateIndustryDtoRes> {
    //     return this.http.put<UpdateIndustryDtoRes>('http://localhost:1234/industries', industry)
    // }
    
    // getById(id: string): Observable<GetByIdIndustryDtoRes> {
    //     return this.http.get<GetByIdIndustryDtoRes>(`http://localhost:1234/industries/${id}`)
    // }

    deleteById(id: string): Observable<DeleteBookmarkDtoRes> {
        return this.http.delete<DeleteBookmarkDtoRes>(`http://localhost:1234/bookmarks/${id}`)
    }

    // deleteMultiple(industry: DeleteMultipleIndustryDtoReq): Observable<DeleteMultipleIndustryDtoRes> {
    //     return this.http.post<DeleteMultipleIndustryDtoRes>('http://localhost:1234/industries/multiple', industry)
    // }

    // @PostMapping
	// public ResponseEntity<InsertLikeDtoRes> insertData(@RequestBody InsertLikeDtoReq data) throws Exception {
	// 	InsertLikeDtoRes response = likeService.insert(data);
	// 	return new ResponseEntity<InsertLikeDtoRes>(response, HttpStatus.CREATED);
	// }
	
	// @GetMapping("user/{id}")
	// public ResponseEntity<GetLikeDtoRes> getById(@PathVariable("id") String id) throws Exception {
	// 	GetLikeDtoRes dataRes = likeService.getByUser(id);
	// 	return new ResponseEntity<GetLikeDtoRes>(dataRes, HttpStatus.OK);
	// }
	
	// @DeleteMapping("{id}")
	// public ResponseEntity<DeleteLikeDtoRes> deleteById(@PathVariable("id") String id) throws Exception {
	// 	DeleteLikeDtoRes dataRes = likeService.delete(id);
	// 	return new ResponseEntity<DeleteLikeDtoRes>(dataRes, HttpStatus.OK);
	// }
	
	// @GetMapping("{idUser}/{idThread}")
	// public ResponseEntity<GetLikeThreadDtoRes> getLikeThread(@PathVariable("idUser") String idUser,@PathVariable("idThread") String idThread) throws Exception {
	// 	GetLikeThreadDtoRes dataRes = likeService.getBookmarkThread(idUser, idThread);
	// 	return new ResponseEntity<GetLikeThreadDtoRes>(dataRes, HttpStatus.OK);
	// }
}