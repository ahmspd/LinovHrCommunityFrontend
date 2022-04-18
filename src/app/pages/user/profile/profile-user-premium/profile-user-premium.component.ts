import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { GetAllPaymentMethodDtoDataRes } from 'src/app/dto/payment-method/get-all-payment-method-dto-data-res';
import { GetAllPaymentMethodDtoRes } from 'src/app/dto/payment-method/get-all-payment-method-dto-res';
import { GetByIdPriceListDtoRes } from 'src/app/dto/price-list/get-by-id-price-list-dto-res';
import { InsertUserMemberDtoReq } from 'src/app/dto/user-member/insert-user-member-dto-req';
import { InsertUserMemberDtoRes } from 'src/app/dto/user-member/insert-user-member-dto-res';
import { UpdateUserMemberPaymentDtoReq } from 'src/app/dto/user-member/update-user-member-payment-dto-req';
import { UpdateUserMemberPaymentDtoRes } from 'src/app/dto/user-member/update-user-member-payment-dto-res';
import { GetUserDtoDataRes } from 'src/app/dto/user/get-user-dto-data-res';
import { GetUserDtoRes } from 'src/app/dto/user/get-user-dto-res';
import { LoginService } from 'src/app/service/login.service';
import { PaymentMethodService } from 'src/app/service/payment-method.service';
import { PriceListService } from 'src/app/service/price-list.service';
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
  paymentMethods: GetAllPaymentMethodDtoDataRes[] = []
  paymentMethodsData : GetAllPaymentMethodDtoRes
  idOrder: string
  idUserMember: string
  file?: File

  idUser: string
  idPriceList: string = '1'
  insertData : InsertUserMemberDtoRes
  updateData : UpdateUserMemberPaymentDtoRes
  priceData : GetByIdPriceListDtoRes

  statPricing: boolean = false
  statUpload: boolean = false
  statWaiting: boolean = false
  statPremium: boolean = false
  pricePremium : BigInteger

  constructor(public router: Router, private confirmationService: ConfirmationService, private paymentMethodService: PaymentMethodService,
    private userMemberService: UserMemberService, private loginService: LoginService, private userService: UserService, private priceListService : PriceListService) { }

  ngOnInit(): void {
    this.idUser = this.loginService.getData().data.id
    this.getData()
  }

  async getData(): Promise<void> {
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

    this.paymentMethodsData = await firstValueFrom(this.paymentMethodService.findAll())
    this.paymentMethods = this.paymentMethodsData.data

    this.priceData = await firstValueFrom(this.priceListService.getById(this.idPriceList))
    this.pricePremium = this.priceData.data.price
  }

  confirm(idPriceList: string): void {
    this.regisPremium.idPriceList = idPriceList
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
      this.getData()
    }
  }

  changeFile(event: any) {
    this.file = event[0]
  }

  removeFile(): void {
    this.file = null
  }
  
  async onUploadInvoice() : Promise<void> {
    this.updateInvoice.idOrder = this.userData.idOrder
    this.updateData = await firstValueFrom(this.userMemberService.updateInvoice(this.updateInvoice, this.file))
    if(this.updateData.data){
      this.getData()
    }
  }

  toLogout() {
    this.loginService.clearData()
    this.router.navigateByUrl("/login")
  }
}
