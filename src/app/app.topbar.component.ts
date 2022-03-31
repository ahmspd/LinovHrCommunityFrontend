import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMainComponent } from './app.main.component';
import { LoginService } from './service/login.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items: MenuItem[];

    constructor(public appMain: AppMainComponent, private loginService : LoginService, private router : Router) { }

    logout():void{
        this.loginService.clearData()
        this.router.navigateByUrl('/login')
    }
}
