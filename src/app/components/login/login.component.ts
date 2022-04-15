import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LoginUserDtoReq } from 'src/app/dto/user/login-user-dto-req';
import { LoginUserDtoRes } from 'src/app/dto/user/login-user-dto-res';
import { LoginService } from 'src/app/service/login.service';
import { ConfigService } from '../../service/app.config.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    :host ::ng-deep .p-password input {
    width: 100%;
    padding:1rem;
    }

    :host ::ng-deep .pi-eye{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }

    :host ::ng-deep .pi-eye-slash{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }
  `]
})
export class LoginComponent implements OnInit {

  valCheck: string[] = ['remember'];
  login: LoginUserDtoReq = new LoginUserDtoReq()
  loginData : LoginUserDtoRes

  isLoading: boolean = false
  constructor(public configService: ConfigService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  async onLogin(isValid: boolean): Promise<void> {
    if (isValid) {
      this.isLoading = true
      try{
        this.loginData = await firstValueFrom(this.loginService.login(this.login))
        if(this.loginData.data){
          this.isLoading = false
          this.loginService.saveData(this.loginData)
          const roleCode: string = this.loginData.data.roleCode
          if(roleCode.match('SA001')){
            this.router.navigateByUrl('/dashboard/admin')
          }
          if(roleCode.match('MB001')){
            this.router.navigateByUrl('/homepage')
          }
        }
      }
      catch(error){
        this.isLoading = false
      }
    }
  }

  forgotPassword():void{
    this.router.navigateByUrl(`/forgot-password`)
  }

  toRegister(){
    this.router.navigateByUrl('/register')
  }
}
