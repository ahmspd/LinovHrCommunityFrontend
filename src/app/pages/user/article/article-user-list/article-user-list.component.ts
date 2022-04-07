import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Subscription } from 'rxjs';
import { GetAllThreadPageDtoRes } from 'src/app/dto/thread/get-all-thread-page-dto-res';
import { LoginService } from 'src/app/service/login.service';
import { ThreadService } from 'src/app/service/thread.service';

@Component({
  selector: 'app-article-user-list',
  templateUrl: './article-user-list.component.html',
  styleUrls: ['./article-user-list.component.scss'],
  providers: [ConfirmationService]

})
export class ArticleUserListComponent implements OnInit , OnDestroy{
  dataArticle : GetAllThreadPageDtoRes[]=[]

  //subcription
  getArticleSubscription? : Subscription
  getAllSubscription?: Subscription

  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true
  idType: string = '2'
  isActive: boolean = true

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

    this.getAllSubscription = this.threadService.getArticleActiveWithPage(this.idType,startPage, maxPage,this.isActive).subscribe({
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

  toArticleDetail(isPremium: boolean, id: string) {
    this.router.navigateByUrl(`/user/article/${id}`)
  }

  ngOnDestroy(): void {
    this.getArticleSubscription?.unsubscribe()
    this.getAllSubscription?.unsubscribe()
  }
}
