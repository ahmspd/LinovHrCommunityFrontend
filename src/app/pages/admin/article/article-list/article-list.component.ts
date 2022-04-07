import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Subscription } from 'rxjs';
import { GetAllThreadPageDtoRes } from 'src/app/dto/thread/get-all-thread-page-dto-res';
import { UpdateThreadStatusDtoReq } from 'src/app/dto/thread/update-thread-status-dto-req';
import { LoginService } from 'src/app/service/login.service';
import { ThreadService } from 'src/app/service/thread.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  providers: [ConfirmationService]
})
export class ArticleListComponent implements OnInit , OnDestroy {
  dataArticle : GetAllThreadPageDtoRes[]=[]

  //subscription
  getThreadSubscription? : Subscription
  getAllSubscription?: Subscription
  updateStatusSubscription? : Subscription

  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true
  idType: string = '2'

  constructor(private router : Router, private confirmationService: ConfirmationService, private loginService : LoginService,
              private threadService : ThreadService) { }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    console.log(event)
    this.getData(event.first, event.rows)
  }

  getData(startPage: number = 0, maxPage: number = this.maxPage): void {
    this.loading = true;

    this.getAllSubscription = this.threadService.getArticleWithPage(this.idType,startPage, maxPage).subscribe({
      next: result => {
        const resultData: any = result
        this.dataArticle = resultData.data
        this.loading = false
        this.totalRecords = resultData.total
        console.log(resultData.total)
      },
      error: _ => this.loading = false
    })
  }

  updateIsActive(id:string,isActive:boolean):void{
    const threadData : UpdateThreadStatusDtoReq = new UpdateThreadStatusDtoReq()
    if(isActive){
      threadData.id = id
      threadData.isActive = false
      this.updateStatusSubscription = this.threadService.updateStatusArticle(threadData).subscribe(result=>{
        if(result){
          this.getData()
        }
      })
    }
    else {
      threadData.id = id
      threadData.isActive = true
      this.updateStatusSubscription = this.threadService.updateStatusArticle(threadData).subscribe(result=>{
        if(result){
          this.getData()
        }
      })
    }
  }

  updateArticle(id:string):void{
    this.router.navigateByUrl(`article/${id}`) 
  }

  detailArticle(id: string):void {
    this.router.navigate([]).then(result => {  window.open(`user/article/${id}`, '_blank'); })
  }

  ngOnDestroy(): void {
    this.getThreadSubscription?.unsubscribe()
    this.getAllSubscription?.unsubscribe()
    this.updateStatusSubscription?.unsubscribe()
  }
}
