import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserForgotPasswordDtoReq } from 'src/app/dto/user/user-forgot-password-dto-req';
import { UserForgotPasswordDtoRes } from 'src/app/dto/user/user-forgot-password-dto-res';
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
export class ProfileForgotPasswordComponent implements OnInit{

  reqData : UserForgotPasswordDtoReq = new UserForgotPasswordDtoReq()
  updateData : UserForgotPasswordDtoRes

  constructor(private userService:UserService, private route:Router) { }

  ngOnInit(): void {
  }

  async update(isValid : boolean) : Promise<void> {
    if(isValid){
      this.updateData = await firstValueFrom(this.userService.forgotPassword(this.reqData))
      if(this.updateData.data){
        this.route.navigateByUrl(`/login`)
      }
    }
  }

}
