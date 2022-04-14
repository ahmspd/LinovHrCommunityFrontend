import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { GetAllThreadPageDtoRes } from 'src/app/dto/thread/get-all-thread-page-dto-res';
import { GetThreadDataDtoRes } from 'src/app/dto/thread/get-thread-data-dto-res';
import { UpdateThreadStatusDtoReq } from 'src/app/dto/thread/update-thread-status-dto-req';
import { UpdateThreadStatusDtoRes } from 'src/app/dto/thread/update-thread-status-dto-res';
import { LoginService } from 'src/app/service/login.service';
import { ThreadService } from 'src/app/service/thread.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  providers: [ConfirmationService]
})
export class ArticleListComponent implements OnInit {
  dataArticle : GetThreadDataDtoRes[]=[]
  aritcleData  : GetAllThreadPageDtoRes

  updateArticleData : UpdateThreadStatusDtoRes

  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true
  idType: string = '2'

  constructor(private router : Router, private confirmationService: ConfirmationService, private loginService : LoginService,
              private threadService : ThreadService) { }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    if (event.globalFilter) {
      this.filter(event.globalFilter)
    } else {
      this.getData(event.first, event.rows)
    }
  }

  filter(text: string): void {
    this.dataArticle = this.dataArticle.filter(list => list.title.includes(text))
  }

  async getData(startPage: number = 0, maxPage: number = this.maxPage): Promise<void> {
    this.loading = true;

    try {
      this.aritcleData = await firstValueFrom(this.threadService.getArticleWithPage(this.idType, startPage, maxPage))
      this.dataArticle = this.aritcleData.data
      this.loading = false
      this.totalRecords = this.aritcleData.total
    }
    catch (error){
      this.loading = false
    }
  }

  async updateIsActive(id:string,isActive:boolean): Promise<void>{
    const threadData : UpdateThreadStatusDtoReq = new UpdateThreadStatusDtoReq()
    if(isActive){
      threadData.id = id
      threadData.isActive = false
      this.updateArticleData = await firstValueFrom(this.threadService.updateStatusArticle(threadData))
      if(this.updateArticleData.data){
        this.getData()
      }
    }
    else {
      threadData.id = id
      threadData.isActive = true
      this.updateArticleData = await firstValueFrom(this.threadService.updateStatusArticle(threadData))
      if(this.updateArticleData.data){
        this.getData()
      }
    }
  }

  updateArticle(id:string):void{
    this.router.navigateByUrl(`article/${id}`) 
  }

  detailArticle(id: string):void {
    this.router.navigate([]).then(result => {  window.open(`user/article/${id}`, '_blank'); })
  }
}
