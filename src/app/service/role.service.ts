import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetAllRolePageDtoRes } from "../dto/role/get-all-role-page-dto-res";


@Injectable({
    providedIn: 'root'
})
export class RoleService {

    constructor(private http: HttpClient) {
    }

    getAll(startPage : number, maxPage : number): Observable<GetAllRolePageDtoRes> {
        return this.http.get<GetAllRolePageDtoRes>(`http://localhost:1234/roles/page?start=${startPage}&max=${maxPage}`)
    }
}