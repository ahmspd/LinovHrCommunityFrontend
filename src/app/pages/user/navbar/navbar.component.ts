import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUserDtoRes } from 'src/app/dto/user/login-user-dto-res';
import { ConfigService } from 'src/app/service/app.config.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  isLogin: boolean = false

  fullname : string

  avatar : string = 'assets/images/avatars/avatar.png'

  dataLogin? : LoginUserDtoRes

  constructor(public configService: ConfigService, public router: Router, private loginService : LoginService) { }

  ngOnInit(): void {
    this.dataLogin = this.loginService.getData()
    if(this.dataLogin !== null){
      this.isLogin = true
      this.fullname = this.dataLogin.data.fullName
      if(this.dataLogin.data.idFile != null){
        
        this.avatar = `http://localhost:1234/files/download/${this.loginService.getData().data.idFile}`

      }

    }
  }
  toRegister(){
    this.router.navigateByUrl('/register')
  }

}
