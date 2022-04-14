import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { firstValueFrom, Subscription } from 'rxjs';
import { GetAllThreadTypeDtoDataRes } from 'src/app/dto/thread-type/get-all-thread-type-dto-data-res';
import { GetAllThreadPageDtoRes } from 'src/app/dto/thread/get-all-thread-page-dto-res';
import { GetThreadDataDtoRes } from 'src/app/dto/thread/get-thread-data-dto-res';
import { LoginService } from 'src/app/service/login.service';
import { ThreadService } from 'src/app/service/thread.service';

@Component({
  selector: 'app-profile-thread',
  templateUrl: './profile-thread.component.html',
  styleUrls: ['./profile-thread.component.scss']
})
export class ProfileThreadComponent implements OnInit{
  threadData: GetAllThreadPageDtoRes
  dataThread: GetThreadDataDtoRes[]=[]

  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  idUser: string
  constructor(public router : Router, private threadService : ThreadService, private loginService : LoginService) { }


  ngOnInit(): void {
    this.idUser = this.loginService.getData().data.id
  }

  loadData(event: LazyLoadEvent) {
    console.log(event)
    this.getData(event.first, event.rows)
  }

  async getData(startPage: number = 0, maxPage: number = this.maxPage): Promise<void> {
    this.loading = true;

    try{
      this.threadData = await firstValueFrom(this.threadService.getThreadByUser(this.idUser, startPage, maxPage))
      this.dataThread = this.threadData.data
      this.loading = false
      this.totalRecords = this.threadData.total
    }
    catch(error){
      this.loading=false
    }
  }

  toThreadDetail(id: string):void {
    this.router.navigateByUrl(`/thread/${id}`)
  }

  toLogout(){
    this.loginService.clearData()
    this.router.navigateByUrl("/login")
  }

}
