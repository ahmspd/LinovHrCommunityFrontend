import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { GetAllUserMemberDtoDataRes } from 'src/app/dto/user-member/get-all-user-member-dto-data-res';
import { GetAllUserMemberDtoRes } from 'src/app/dto/user-member/get-all-user-member-dto-res';
import { UpdateUserMemberAcceptDtoReq } from 'src/app/dto/user-member/update-user-member-accept-dto-req';
import { UpdateUserMemberAcceptDtoRes } from 'src/app/dto/user-member/update-user-member-accept-dto-res';
import { UserMemberService } from 'src/app/service/user-member.service';

@Component({
  selector: 'app-user-member-admin-list',
  templateUrl: './user-member-admin-list.component.html',
  styleUrls: ['./user-member-admin-list.component.scss'],
  providers: [ConfirmationService]
})
export class UserMemberAdminListComponent implements OnInit {

  userMemberData: GetAllUserMemberDtoDataRes[] = []
  userMember : GetAllUserMemberDtoRes
  userMemberUpadate : UpdateUserMemberAcceptDtoRes
  updateData: UpdateUserMemberAcceptDtoReq = new UpdateUserMemberAcceptDtoReq()


  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true
  isAccept: boolean = false

  constructor(private confirmationService: ConfirmationService, private router: Router, private userMemberService: UserMemberService) { }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    console.log(event)
    this.getData(event.first, event.rows)
  }

  async getData(startPage: number = 0, maxPage: number = this.maxPage): Promise<void> {
    this.loading = true;

    try{
      this.userMember = await firstValueFrom(this.userMemberService.getAllUserMember(this.isAccept, startPage, maxPage))
      this.userMemberData = this.userMember.data
      this.loading = false
      this.totalRecords = this.userMember.total
    }
    catch(error){
      this.loading = false
    }
  }

  update(id: string): void {

    this.confirmationService.confirm({
      key: 'confirm',
      message: 'Are you sure to confirm this payment?',
      accept: () => {
        this.updateData.idUserMember = id
        this.updateData.isAccept = true
        
        this.updateMember()
      },
      reject: () => {
        this.getData()
      }
    });
  }

  async updateMember() : Promise<void>{
    this.userMemberUpadate = await firstValueFrom(this.userMemberService.updateUserMember(this.updateData))
    if(this.userMemberUpadate.data){
      this.getData()
    }
  }
}
