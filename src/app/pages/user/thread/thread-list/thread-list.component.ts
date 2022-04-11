import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Subscription } from 'rxjs';
import { GetAllThreadPageDtoRes } from 'src/app/dto/thread/get-all-thread-page-dto-res';
import { GetThreadDataDtoRes } from 'src/app/dto/thread/get-thread-data-dto-res';
import { LoginService } from 'src/app/service/login.service';
import { ThreadService } from 'src/app/service/thread.service';

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.scss']
})
export class ThreadListComponent implements OnInit, OnDestroy {


  dataThread: GetAllThreadPageDtoRes[] = []
  dataArticle: GetThreadDataDtoRes[] = []
  //subscription
  getAllSubscription?: Subscription
  getAllArticleSubscription?: Subscription

  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true
  idType: string = '2'

  constructor(private router: Router, private threadService: ThreadService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.getAllArticleSubscription = this.threadService.getArticleActiveWithPage(this.idType, 0, 2, true).subscribe(result => {
      this.dataArticle = result.data
    })
  }

  loadData(event: LazyLoadEvent) {
    console.log(event)
    this.getData(event.first, event.rows)
  }

  getData(startPage: number = 0, maxPage: number = this.maxPage): void {
    this.loading = true;

    this.getAllSubscription = this.threadService.getThreadWithPage(startPage, maxPage).subscribe({
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

  toThreadDetail(isPremium: boolean, id: string) {
    if (isPremium) {
      if (this.loginService.getData() != null) {
        if (this.loginService.getData().data.isMember) {
          this.router.navigateByUrl(`/thread/${id}`)
        }
        else {
          console.log("go member");
        }
      }
      else {
        this.router.navigateByUrl(`/login`)
      }
    }
    else {
      this.router.navigateByUrl(`/thread/${id}`)
    }
  }

  likeClick() {

  }

  bookmarkClick() {

  }

  commentClick() {
  }

  ngOnDestroy(): void {
    this.getAllSubscription?.unsubscribe()
    this.getAllArticleSubscription?.unsubscribe()
  }
}
