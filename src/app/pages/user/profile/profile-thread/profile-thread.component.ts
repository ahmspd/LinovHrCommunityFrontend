import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Subscription } from 'rxjs';
import { GetAllThreadPageDtoRes } from 'src/app/dto/thread/get-all-thread-page-dto-res';
import { LoginService } from 'src/app/service/login.service';
import { ThreadService } from 'src/app/service/thread.service';

@Component({
  selector: 'app-profile-thread',
  templateUrl: './profile-thread.component.html',
  styleUrls: ['./profile-thread.component.scss']
})
export class ProfileThreadComponent implements OnInit , OnDestroy{
  dataThread: GetAllThreadPageDtoRes[] = []

  //subscription
  getThreadByUserSubscription? : Subscription

  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  idUser: string
  constructor(private router : Router, private threadService : ThreadService, private loginService : LoginService) { }


  ngOnInit(): void {
    this.idUser = this.loginService.getData().data.id
  }

  loadData(event: LazyLoadEvent) {
    console.log(event)
    this.getData(event.first, event.rows)
  }

  getData(startPage: number = 0, maxPage: number = this.maxPage): void {
    this.loading = true;

    this.getThreadByUserSubscription = this.threadService.getThreadByUser(this.idUser,startPage, maxPage).subscribe({
      next: result => {
        const resultData: any = result
        this.dataThread = resultData.data
        this.loading = false
        this.totalRecords = resultData.total
        console.log(resultData.total)
      },
      error: _ => this.loading = false
    })
  }

  toThreadDetail(id: string):void {
    this.router.navigateByUrl(`/thread/${id}`)

  }

  toEdit(){
    this.router.navigateByUrl("/user/setting/edit-profile")
  }

  toChangePass(){
    this.router.navigateByUrl("/user/setting/change-password")
  }

  toPremium(){
    this.router.navigateByUrl("/user/setting/premium")
  }

  toLogout(){
    this.router.navigateByUrl("/login")
  }
  toThread(){
    this.router.navigateByUrl("/user/setting/thread")
  }
  toThreadLike(){
    this.router.navigateByUrl("/user/setting/thread-like")
  }
  toThreadBookmark(){
    this.router.navigateByUrl("/user/setting/thread-bookmark")
  }

  ngOnDestroy(): void {
    this.getThreadByUserSubscription?.unsubscribe()
  }
}
