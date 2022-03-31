import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { LoginUserDtoReq } from 'src/app/dto/user/login-user-dto-req';
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
export class LoginComponent implements OnInit, OnDestroy {

  valCheck: string[] = ['remember'];
  login: LoginUserDtoReq = new LoginUserDtoReq()
  config: AppConfig;
  subscription: Subscription;

  constructor(public configService: ConfigService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
  }

  onLogin(isValid: boolean): void {
    if (isValid) {
      this.loginService.login(this.login).subscribe(result => {
        console.log(result)
        this.loginService.saveData(result)
        this.router.navigateByUrl('/dashboard')
      })
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
