import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { firstValueFrom, Subscription } from 'rxjs';
import { InsertUserMemberDtoReq } from 'src/app/dto/user-member/insert-user-member-dto-req';
import { InsertUserMemberDtoRes } from 'src/app/dto/user-member/insert-user-member-dto-res';
import { UpdateUserMemberPaymentDtoReq } from 'src/app/dto/user-member/update-user-member-payment-dto-req';
import { UpdateUserMemberPaymentDtoRes } from 'src/app/dto/user-member/update-user-member-payment-dto-res';
import { GetUserDtoDataRes } from 'src/app/dto/user/get-user-dto-data-res';
import { GetUserDtoRes } from 'src/app/dto/user/get-user-dto-res';
import { LoginService } from 'src/app/service/login.service';
import { UserMemberService } from 'src/app/service/user-member.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile-user-premium',
  templateUrl: './profile-user-premium.component.html',
  styleUrls: ['./profile-user-premium.component.scss'],
  providers: [ConfirmationService]
})
export class ProfileUserPremiumComponent implements OnInit {
  status: number
  duration: number
  regisPremium: InsertUserMemberDtoReq = new InsertUserMemberDtoReq()
  updateInvoice: UpdateUserMemberPaymentDtoReq = new UpdateUserMemberPaymentDtoReq()
  userData: GetUserDtoDataRes = new GetUserDtoDataRes()
  datas: GetUserDtoRes
  idOrder: string
  idUserMember: string
  file?: File

  idUser: string
  insertData : InsertUserMemberDtoRes
  updateData : UpdateUserMemberPaymentDtoRes

  statPricing: boolean = false
  statUpload: boolean = false
  statWaiting: boolean = false
  statPremium: boolean = false

  constructor(public router: Router, private confirmationService: ConfirmationService,
    private userMemberService: UserMemberService, private loginService: LoginService, private userService: UserService) { }

  ngOnInit(): void {
    this.idUser = this.loginService.getData().data.id
    this.getDataUser()
  }

  async getDataUser(): Promise<void> {
    this.datas = await firstValueFrom(this.userService.getById(this.idUser))
    this.userData = this.datas.data
    if (this.userData.statUserMember === 0) {
      this.statPricing = true
      this.statUpload = false
      this.statWaiting = false
      this.statPremium = false
    }
    if (this.userData.statUserMember === 1) {
      this.statPricing = false
      this.statUpload = true
      this.statWaiting = false
      this.statPremium = false
    }
    if (this.userData.statUserMember === 2) {
      this.statPricing = false
      this.statUpload = false
      this.statWaiting = true
      this.statPremium = false
    }
    if (this.userData.statUserMember === 3) {
      this.statPricing = false
      this.statUpload = false
      this.statWaiting = false
      this.statPremium = true
    }
  }
  confirm(idPriceList: string): void {
    this.regisPremium.idPriceList = idPriceList
    this.regisPremium.idPaymentMethod = '2'
    this.confirmationService.confirm({
      message: 'Are you sure that you want to buy this ?',
      accept: () => {
        this.onCreate()
      }
    });
  }

  async onCreate() : Promise<void> {
    this.insertData = await firstValueFrom(this.userMemberService.insert(this.regisPremium))
    if(this.insertData.data){
      this.idOrder = this.insertData.data.idOrder
      this.idUserMember = this.insertData.data.id
      this.getDataUser()
    }
  }

  changeFile(event: any) {
    this.file = event[0]
    this.updateInvoice.idOrder = this.userData.idOrder
  }

  async onUploadInvoice() : Promise<void> {
    this.updateData = await firstValueFrom(this.userMemberService.updateInvoice(this.updateInvoice, this.file))
    if(this.updateData.data){
      this.getDataUser()
    }
  }

  toLogout() {
    this.loginService.clearData()
    this.router.navigateByUrl("/login")
  }
}
