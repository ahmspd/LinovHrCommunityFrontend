import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "../service/login.service";

@Injectable({
    providedIn: 'root'
})
export class AccessGuard implements CanActivate {
    constructor(private router: Router, private loginService : LoginService){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // const url: string | undefined = state.url
        const roleCode: string | undefined = this.loginService.getData()?.data.roleCode
        if(roleCode.match('MB001')){
            this.router.navigateByUrl('/homepage')
            return false
        }
        return true
    }
}