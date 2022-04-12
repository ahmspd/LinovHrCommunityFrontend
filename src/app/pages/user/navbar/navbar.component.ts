import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppConfig } from 'src/app/api/appconfig';
import { ConfigService } from 'src/app/service/app.config.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  
  config: AppConfig  

  subscription: Subscription
  
  isLogin: boolean = false

  fullname : string

  avatar : string = 'assets/images/avatars/avatar.png'

  constructor(public configService: ConfigService, public router: Router, private loginService : LoginService) { }

  ngOnInit(): void {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
    if(this.loginService.getData().data!=null){
      this.isLogin = true
      this.fullname = this.loginService.getData().data.fullName
      if(this.loginService.getData().data.idFile != null){
        
        this.avatar = `http://localhost:1234/files/download/${this.loginService.getData().data.idFile}`

      }

    }
  }

  toRegister(){
    this.router.navigateByUrl('/register')
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
