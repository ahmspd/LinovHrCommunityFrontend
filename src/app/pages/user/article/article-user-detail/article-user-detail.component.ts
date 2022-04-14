import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map, Subscription } from 'rxjs';
import { GetThreadDataDtoRes } from 'src/app/dto/thread/get-thread-data-dto-res';
import { GetThreadDetailDtoRes } from 'src/app/dto/thread/get-thread-detail-dto-res';
import { ThreadService } from 'src/app/service/thread.service';

@Component({
  selector: 'app-article-user-detail',
  templateUrl: './article-user-detail.component.html',
  styleUrls: ['./article-user-detail.component.scss']
})
export class ArticleUserDetailComponent implements OnInit{
  articleDetailData: GetThreadDataDtoRes = new GetThreadDataDtoRes()
  articleDetail : GetThreadDetailDtoRes

  idThread:string
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private threadService: ThreadService) { }

  ngOnInit(): void {
    this.getData()
  }

  async getData(): Promise<void> {
    const result = await firstValueFrom(this.activatedRoute.params.pipe(map(result=>result)))
    this.idThread = (result as any).id

    this.articleDetail = await firstValueFrom(this.threadService.getThreadDetail(this.idThread))
    this.articleDetailData = this.articleDetail.data
  }
}
