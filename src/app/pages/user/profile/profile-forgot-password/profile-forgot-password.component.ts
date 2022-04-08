import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserForgotPasswordDtoReq } from 'src/app/dto/user/user-forgot-password-dto-req';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile-forgot-password',
  templateUrl: './profile-forgot-password.component.html',
  styles:[`
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
export class ProfileForgotPasswordComponent implements OnInit , OnDestroy{

  reqData : UserForgotPasswordDtoReq = new UserForgotPasswordDtoReq()

  //subscription
  forgotPasswordSubscription? : Subscription

  constructor(private userService:UserService, private route:Router) { }

  ngOnInit(): void {
  }

  update(isValid : boolean) : void {
    if(isValid){
      this.forgotPasswordSubscription = this.userService.forgotPassword(this.reqData).subscribe(result=> {
        if(result.data){
          this.route.navigateByUrl(`/login`)
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.forgotPasswordSubscription?.unsubscribe()
  }
}
