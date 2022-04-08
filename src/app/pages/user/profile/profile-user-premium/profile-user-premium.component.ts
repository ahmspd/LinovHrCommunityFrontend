import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { InsertUserMemberDtoReq } from 'src/app/dto/user-member/insert-user-member-dto-req';
import { UpdateUserMemberPaymentDtoReq } from 'src/app/dto/user-member/update-user-member-payment-dto-req';
import { UserMemberService } from 'src/app/service/user-member.service';

@Component({
  selector: 'app-profile-user-premium',
  templateUrl: './profile-user-premium.component.html',
  styleUrls: ['./profile-user-premium.component.scss'],
  providers: [ConfirmationService]
})
export class ProfileUserPremiumComponent implements OnInit, OnDestroy {
  status: number
  duration: number
  regisPremium: InsertUserMemberDtoReq = new InsertUserMemberDtoReq()
  updateInvoice: UpdateUserMemberPaymentDtoReq = new UpdateUserMemberPaymentDtoReq()
  regisPremiumSubs?: Subscription
  updateInvoiceSubs?: Subscription
  idOrder: string
  idUserMember: string
  file? : File

  constructor(private router: Router, private confirmationService: ConfirmationService,
    private userMemberService: UserMemberService) { }

  ngOnInit(): void {

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

  onCreate() {
    this.regisPremiumSubs = this.userMemberService.insert(this.regisPremium).subscribe(result => {
      if (result.data) {
        this.idOrder = result.data.idOrder
        this.idUserMember = result.data.id
        this.router.navigateByUrl('/user/setting/premium')
      }
    })
  }

  changeFile(event : any){
    this.file = event[0]
    this.updateInvoice.idOrder = this.idOrder
  }

  onUploadInvoice(){
    this.updateInvoiceSubs = this.userMemberService.updateInvoice(this.updateInvoice, this.file).subscribe(result => {
      if (result.data) {
        this.router.navigateByUrl('/user/setting/premium')
      } 
    })
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

  ngOnDestroy(): void {
    this.regisPremiumSubs?.unsubscribe()
    this.updateInvoiceSubs?.unsubscribe()
  }

}
