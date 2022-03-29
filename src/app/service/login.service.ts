import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { LoginUserDtoReq } from "../dto/user/login-user-dto-req";
import { LoginUserDtoRes } from "../dto/user/login-user-dto-res";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    status$?: Observable<string>
    statusObserver?: Observer<string>

    constructor(private http: HttpClient) {
    }

    login(login: LoginUserDtoReq): Observable<LoginUserDtoRes> {
        return this.http.post<LoginUserDtoRes>('http://localhost:1234/login', login)
      }

    saveData(loginRes: LoginUserDtoRes): void {
        localStorage.setItem('data', JSON.stringify(loginRes))
    }

    getData(): LoginUserDtoRes | null {
        const data = localStorage.getItem('data')

        if(data) {
            return JSON.parse(data)
        }

        return null
    }

    clearData(): void {
        localStorage.clear()
    }
}