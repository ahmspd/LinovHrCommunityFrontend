import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { GetAllThreadPageDtoRes } from 'src/app/dto/thread/get-all-thread-page-dto-res';
import { GetThreadDataDtoRes } from 'src/app/dto/thread/get-thread-data-dto-res';
import { BookmarkService } from 'src/app/service/bookmark.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-profile-thread-bookmark',
  templateUrl: './profile-thread-bookmark.component.html',
  styleUrls: ['./profile-thread-bookmark.component.scss']
})
export class ProfileThreadBookmarkComponent implements OnInit{

  threadData: GetAllThreadPageDtoRes
  dataThread: GetThreadDataDtoRes[] = []

  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  idUser: string
  constructor(public router : Router, private bookmarkService : BookmarkService, private loginService : LoginService) { }


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
      this.threadData = await firstValueFrom(this.bookmarkService.getThreadBookmarkByUser(startPage, maxPage))
      this.dataThread = this.threadData.data
      this.loading = false
      this.totalRecords = this.threadData.total
    }
    catch(error){
      this.loading = false
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
