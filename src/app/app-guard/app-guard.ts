import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment } from "@angular/router";
import { LoginUserDtoRes } from "../dto/user/login-user-dto-res";
import { LoginService } from "../service/login.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad {
    constructor(private loginService : LoginService, private router : Router){}

    canLoad(route: Route, segments: UrlSegment[]): boolean {
        const data : LoginUserDtoRes | null = this.loginService.getData()
        if(!data){
            this.router.navigateByUrl('/login')
            return false
        }
        return true;
    }
}