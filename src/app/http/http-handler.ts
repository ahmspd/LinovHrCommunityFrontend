import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http"
import { Injectable } from "@angular/core";
import { Route, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Observable, tap } from "rxjs";
import { LoginService } from "../service/login.service";

@Injectable()
export class HttpHandlerCommunity implements HttpInterceptor {

    route?: Route

    constructor(private loginService: LoginService, private messageService: MessageService, private router: Router) { }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const dataLogin = this.loginService.getData()
        let token : any

        if (dataLogin) {
            token = dataLogin.data.token
     
        }

        const reqClone = req.clone({ 
            setHeaders: { 
                'Authorization': `Bearer ${token}` 
            } 
        })

        return next.handle(reqClone).pipe(
            tap({
                next: data => {
                    if (data instanceof HttpResponse) {
                        if(data.body.message) {
                            console.log('next > ', data)
                            this.messageService.add({ severity: 'success', summary: 'Success', detail: data.body.message });
                        }
                    }
                },
                error: err => {
                    if (err instanceof HttpErrorResponse) {
                        if(err.error && err.error.message){
                            console.log('error > ', err)
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
                            console.log(this.router.url)
                        }
                        if(err.status == 401 && this.router.url !== '/login') {
                            this.router.navigateByUrl('')
                        }
                    }
                }
            })
        )
    }

}