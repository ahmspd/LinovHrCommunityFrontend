import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetUserDtoDataRes } from "../dto/user/get-user-dto-data-res";
import { GetUserDtoRes } from "../dto/user/get-user-dto-res";
import { InsertUserDtoReq } from "../dto/user/insert-user-dto-req";
import { InsertUserDtoRes } from "../dto/user/insert-user-dto-res";
import { RegistrationCodeDtoReq } from "../dto/user/registration-code-dto-req";
import { RegistrationCodeDtoRes } from "../dto/user/registration-code-dto-res";
import { UpdatePasswordDtoReq } from "../dto/user/update-password-dto-req";
import { UpdatePasswordDtoRes } from "../dto/user/update-password-dto-res";
import { UpdateUserDtoReq } from "../dto/user/update-user-dto-req";
import { UpdateUserDtoRes } from "../dto/user/update-user-dto-res";
import { UserForgotPasswordDtoReq } from "../dto/user/user-forgot-password-dto-req";
import { UserForgotPasswordDtoRes } from "../dto/user/user-forgot-password-dto-res";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    insert(data: InsertUserDtoReq): Observable<InsertUserDtoRes> {
        return this.http.post<InsertUserDtoRes>('http://localhost:1234/users', data)
    }

    registration(data: RegistrationCodeDtoReq): Observable<RegistrationCodeDtoRes> {
        return this.http.put<RegistrationCodeDtoRes>('http://localhost:1234/users/registration', data)
    }

    getById(id : string): Observable<GetUserDtoRes> {
        return this.http.get<GetUserDtoRes>(`http://localhost:1234/users/${id}`)
    }

    updateIsActive(data: UpdateUserDtoReq): Observable<UpdateUserDtoRes> {
        return this.http.put<UpdateUserDtoRes>('http://localhost:1234/users/update', data)
    }

    updatePassword(data: UpdatePasswordDtoReq): Observable<UpdatePasswordDtoRes> {
        return this.http.put<UpdatePasswordDtoRes>('http://localhost:1234/users/password', data)
    }

    forgotPassword(data: UserForgotPasswordDtoReq): Observable<UserForgotPasswordDtoRes>{
        return this.http.put<UserForgotPasswordDtoRes>('http://localhost:1234/users/forgot-password', data)
    }

    updateProfile(data : GetUserDtoDataRes,file?:File) : Observable<UpdateUserDtoRes>{
        const formData: FormData = new FormData()
        formData.append('content', JSON.stringify(data))
        if(file){
            formData.append('file', file)
        }
        return this.http.put<UpdateUserDtoRes>(`http://localhost:1234/users`,formData)
    }
}