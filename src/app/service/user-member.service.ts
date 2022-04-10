import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { InsertUserMemberDtoReq } from "../dto/user-member/insert-user-member-dto-req";
import { InsertUserMemberDtoRes } from "../dto/user-member/insert-user-member-dto-res";
import { UpdateUserMemberPaymentDtoReq } from "../dto/user-member/update-user-member-payment-dto-req";
import { UpdateUserMemberPaymentDtoRes } from "../dto/user-member/update-user-member-payment-dto-res";
import { GetAllUserMemberDtoRes } from "../dto/user-member/get-all-user-member-dto-res";
import { UpdateUserMemberAcceptDtoReq } from "../dto/user-member/update-user-member-accept-dto-req";
import { UpdateUserMemberAcceptDtoRes } from "../dto/user-member/update-user-member-accept-dto-res";

@Injectable({
    providedIn: 'root'
})
export class UserMemberService {
    constructor(private http: HttpClient) {
    }

    insert(data: InsertUserMemberDtoReq): Observable<InsertUserMemberDtoRes> {
        return this.http.post<InsertUserMemberDtoRes>('http://localhost:1234/user-members', data)
    }

    updateInvoice(insertReq: UpdateUserMemberPaymentDtoReq, file?: File): Observable<UpdateUserMemberPaymentDtoRes> {
        const formData: FormData = new FormData()
        formData.append('content', JSON.stringify(insertReq))
        if (file) {
            formData.append('file', file)
        }
        return this.http.put<UpdateUserMemberPaymentDtoRes>('http://localhost:1234/user-members/file-payment', formData)
    }

    getAllUserMember(isAccept : boolean, startPage: number, maxPage: number): Observable<GetAllUserMemberDtoRes> {
        return this.http.get<GetAllUserMemberDtoRes>(`http://localhost:1234/user-members?isAccept=${isAccept}&start=${startPage}&max=${maxPage}`)
    }

    updateUserMember(data : UpdateUserMemberAcceptDtoReq): Observable<UpdateUserMemberAcceptDtoRes> {
        return this.http.put<UpdateUserMemberAcceptDtoRes>(`http://localhost:1234/user-members/premium`, data)
    }

    // @PutMapping("/premium")
	// public ResponseEntity<UpdateUserMemberAcceptDtoRes> updateAccept(
	// 		@RequestBody @Valid UpdateUserMemberAcceptDtoReq request) throws Exception {
	// 	UpdateUserMemberAcceptDtoRes response = userMemberService.updateAccept(request);
	// 	return new ResponseEntity<UpdateUserMemberAcceptDtoRes>(response, HttpStatus.OK);
	// }
}