import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UpdatePasswordDtoReq } from 'src/app/dto/user/update-password-dto-req';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile-change-password',
  templateUrl: './profile-change-password.component.html',
  styleUrls: ['./profile-change-password.component.scss']
})
export class ProfileChangePasswordComponent implements OnInit, OnDestroy {

  newPass: UpdatePasswordDtoReq = new UpdatePasswordDtoReq()

  confirmPassword: string
  idUser: string

  //subscription
  updatePasswordSubscription?: Subscription

  constructor(private router: Router, private userService: UserService, private loginService : LoginService) { }

  ngOnInit(): void {
    this.idUser = this.loginService.getData().data.id
  }

  toEdit() {
    this.router.navigateByUrl("/user/setting/edit-profile")
  }

  toChangePass() {
    this.router.navigateByUrl("/user/setting/change-password")
  }

  toPremium() {
    this.router.navigateByUrl("/user/setting/premium")
  }

  toLogout() {
    this.router.navigateByUrl("/login")
  }

  changePassword(isValid: boolean): void {
    if (isValid) {
      if (this.newPass.password.match(this.confirmPassword)) {
        this.newPass.id = this.idUser
        this.updatePasswordSubscription = this.userService.updatePassword(this.newPass).subscribe(result => {
          if (result.data) {
            this.loginService.clearData()
            this.router.navigateByUrl('/login')
          }
        })
      }
      else {
        alert("password did not match")
      }
    }

  }
  ngOnDestroy(): void {
    this.updatePasswordSubscription?.unsubscribe()
  }
}
