import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { UpdatePasswordDtoReq } from 'src/app/dto/user/update-password-dto-req';
import { UpdatePasswordDtoRes } from 'src/app/dto/user/update-password-dto-res';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile-change-password',
  templateUrl: './profile-change-password.component.html',
  styleUrls: ['./profile-change-password.component.scss']
})
export class ProfileChangePasswordComponent implements OnInit {

  newPass: UpdatePasswordDtoReq = new UpdatePasswordDtoReq()

  confirmPassword: string
  dataUpdate : UpdatePasswordDtoRes
  idUser: string

  constructor(public router: Router, private userService: UserService, private loginService : LoginService) { }

  ngOnInit(): void {
    this.idUser = this.loginService.getData().data.id
  }

  toLogout() {
    this.loginService.clearData()
    this.router.navigateByUrl("/login")
  }

  async changePassword(isValid: boolean): Promise<void> {
    if (isValid) {
      if (this.newPass.password.match(this.confirmPassword)) {
        this.newPass.id = this.idUser
        this.dataUpdate = await firstValueFrom(this.userService.updatePassword(this.newPass))
        if(this.dataUpdate.data){
          this.loginService.clearData()
          this.router.navigateByUrl('/login')
        }
      }
      else {
        alert("password did not match")
      }
    }

  }
}
