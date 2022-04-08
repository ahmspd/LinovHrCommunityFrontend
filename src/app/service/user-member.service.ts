import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { InsertUserMemberDtoReq } from "../dto/user-member/insert-user-member-dto-req";
import { InsertUserMemberDtoRes } from "../dto/user-member/insert-user-member-dto-res";
import { UpdateUserMemberPaymentDtoReq } from "../dto/user-member/update-user-member-payment-dto-req";
import { UpdateUserMemberPaymentDtoRes } from "../dto/user-member/update-user-member-payment-dto-res";

@Injectable({
    providedIn: 'root'
})
export class UserMemberService{
    constructor(private http : HttpClient){
    }

   insert(data : InsertUserMemberDtoReq): Observable<InsertUserMemberDtoRes>{
       return this.http.post<InsertUserMemberDtoRes>('http://localhost:1234/user-members', data)
   }

   updateInvoice(insertReq: UpdateUserMemberPaymentDtoReq, file? : File): Observable<UpdateUserMemberPaymentDtoRes>{
    const formData : FormData = new FormData()
    formData.append('content', JSON.stringify(insertReq))
    if(file){
        formData.append('file', file)
    }
    return this.http.put<UpdateUserMemberPaymentDtoRes>('http://localhost:1234/user-members/file-payment', formData)
}

}