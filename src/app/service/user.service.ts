import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetUserDtoDataRes } from "../dto/user/get-user-dto-data-res";
import { InsertUserDtoReq } from "../dto/user/insert-user-dto-req";
import { InsertUserDtoRes } from "../dto/user/insert-user-dto-res";
import { RegistrationCodeDtoReq } from "../dto/user/registration-code-dto-req";
import { RegistrationCodeDtoRes } from "../dto/user/registration-code-dto-res";
import { UpdateUserDtoReq } from "../dto/user/update-user-dto-req";
import { UpdateUserDtoRes } from "../dto/user/update-user-dto-res";

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

    getById(id : string): Observable<GetUserDtoDataRes> {
        return this.http.get<GetUserDtoDataRes>(`http://localhost:1234/users/${id}`)
    }

    updateIsActive(data: UpdateUserDtoReq): Observable<UpdateUserDtoRes> {
        return this.http.put<UpdateUserDtoRes>('http://localhost:1234/users/update', data)
    }

}