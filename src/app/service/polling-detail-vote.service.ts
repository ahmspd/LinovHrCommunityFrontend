import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetCountPollingVoteDtoRes } from "../dto/polling-detail-vote/get-count-polling-vote-dto-res";
import { GetPollingDtoRes } from "../dto/polling-detail-vote/get-polling-dto-res";
import { InsertPollingVoteDtoReq } from "../dto/polling-detail-vote/insert-polling-vote-dto-req";
import { InsertPollingVoteDtoRes } from "../dto/polling-detail-vote/insert-polling-vote-dto-res";

@Injectable({
    providedIn: 'root'
})
export class PollingDetailVoteService {

    constructor(private http: HttpClient) {
    }

    insert(data : InsertPollingVoteDtoReq): Observable<InsertPollingVoteDtoRes> {
        return this.http.post<InsertPollingVoteDtoRes>(`http://localhost:1234/polling-detail-votes`, data)
    }

    // @GetMapping("{idUser}/{idPollingDetail}")
	// public ResponseEntity<GetPollingDtoRes> getBookmarkThread(@PathVariable("idUser") String idUser,@PathVariable("idPollingDetail") String idPollingDetail) throws Exception {
	// 	GetPollingDtoRes dataRes = pollingDetailVoteService.getVote(idUser, idPollingDetail);
	// 	return new ResponseEntity<GetPollingDtoRes>(dataRes, HttpStatus.OK);
	// }

    getVote(idUser : string, idPollingDetail : string): Observable<GetPollingDtoRes> {
        return this.http.get<GetPollingDtoRes>(`http://localhost:1234/polling-detail-votes/${idUser}/${idPollingDetail}`)
    }

    // @GetMapping("total/{id}")
	// public ResponseEntity<GetCountPollingVoteDtoRes> getPersentase(@PathVariable String id) throws Exception {
	// 	GetCountPollingVoteDtoRes response = pollingDetailVoteService.getVotePolling(null);
	// 	return new ResponseEntity<GetCountPollingVoteDtoRes>(response, HttpStatus.OK);
	// }
	
    getDetailVote(id : string): Observable<GetCountPollingVoteDtoRes> {
        return this.http.get<GetCountPollingVoteDtoRes>(`http://localhost:1234/polling-detail-votes/total/${id}`)
    }
}