import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Subscription } from 'rxjs';
import { GetAllUserMemberDtoDataRes } from 'src/app/dto/user-member/get-all-user-member-dto-data-res';
import { UpdateUserMemberAcceptDtoReq } from 'src/app/dto/user-member/update-user-member-accept-dto-req';
import { UserMemberService } from 'src/app/service/user-member.service';

@Component({
  selector: 'app-user-member-admin-list',
  templateUrl: './user-member-admin-list.component.html',
  styleUrls: ['./user-member-admin-list.component.scss'],
  providers: [ConfirmationService]
})
export class UserMemberAdminListComponent implements OnInit, OnDestroy {

  userMemberData: GetAllUserMemberDtoDataRes[] = []

  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true
  isAccept: boolean = false

  //Subscription
  getAllSubscription?: Subscription
  updateSubscription?: Subscription

  constructor(private confirmationService: ConfirmationService, private router: Router, private userMemberService: UserMemberService) { }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    console.log(event)
    this.getData(event.first, event.rows)
  }

  getData(startPage: number = 0, maxPage: number = this.maxPage): void {
    this.loading = true;

    this.getAllSubscription = this.userMemberService.getAllUserMember(this.isAccept, startPage, maxPage).subscribe({
      next: result => {
        const resultData: any = result
        this.userMemberData = resultData.data
        this.loading = false
        this.totalRecords = resultData.total
        console.log(resultData.total)
      },
      error: _ => this.loading = false
    })
  }

  update(id: string): void {

    this.confirmationService.confirm({
      key: 'confirm',
      message: 'Are you sure to confirm this payment?',
      accept: () => {
        const updateData: UpdateUserMemberAcceptDtoReq = new UpdateUserMemberAcceptDtoReq()
        updateData.idUserMember = id
        updateData.isAccept = true
        this.updateSubscription = this.userMemberService.updateUserMember(updateData).subscribe(result => {
          if (result.data) {
            this.getData()
          }
        })
      },
      reject: () => {
        this.getData()
      }
    });
  }
  ngOnDestroy(): void {

  }
}
