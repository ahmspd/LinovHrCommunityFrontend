import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { GetThreadDataDtoRes } from 'src/app/dto/thread/get-thread-data-dto-res';
import { GetThreadDtoRes } from 'src/app/dto/thread/get-thread-dto-res';
import { LoginService } from 'src/app/service/login.service';
import { ThreadService } from 'src/app/service/thread.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  providers: [ConfirmationService]
})
export class ArticleListComponent implements OnInit , OnDestroy {
  dataArticle : GetThreadDataDtoRes[]=[]

  //subscription
  getThreadSubscription? : Subscription

  constructor(private router : Router, private confirmationService: ConfirmationService, private loginService : LoginService,
              private threadService : ThreadService) { }

  ngOnInit(): void {
    this.getThreadSubscription = this.threadService.getThreadByType('2').subscribe(result => {
      this.dataArticle = result.data
    })
  }

  ngOnDestroy(): void {
    this.getThreadSubscription?.unsubscribe()
  }
}
