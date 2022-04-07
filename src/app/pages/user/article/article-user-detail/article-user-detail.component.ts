import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetThreadDataDtoRes } from 'src/app/dto/thread/get-thread-data-dto-res';
import { ThreadService } from 'src/app/service/thread.service';

@Component({
  selector: 'app-article-user-detail',
  templateUrl: './article-user-detail.component.html',
  styleUrls: ['./article-user-detail.component.scss']
})
export class ArticleUserDetailComponent implements OnInit , OnDestroy{
  articleDetailData: GetThreadDataDtoRes = new GetThreadDataDtoRes()
  //subscription
  getDataSubscription?: Subscription
  activatedRouteSubscription?: Subscription

  idThread:string
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private threadService: ThreadService) { }

  ngOnInit(): void {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(result => {
      this.idThread = (result as any).id
      this.getData()
    })
  }

  getData() {
    this.getDataSubscription = this.threadService.getThreadDetail(this.idThread).subscribe(result => {
      this.articleDetailData = result.data
    })
  }

  ngOnDestroy(): void {
    this.getDataSubscription?.unsubscribe()
    this.activatedRouteSubscription?.unsubscribe()
  }
}
