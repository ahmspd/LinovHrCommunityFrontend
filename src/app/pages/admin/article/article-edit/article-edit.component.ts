import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetThreadDataDtoRes } from 'src/app/dto/thread/get-thread-data-dto-res';
import { UpdateArticleDtoReq } from 'src/app/dto/thread/update-article-dto-req';
import { ThreadService } from 'src/app/service/thread.service';
import * as ClassicEditor from 'src/ckeditor5/build/ckeditor';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit, OnDestroy {
  editor: any = ClassicEditor;

  articleData: GetThreadDataDtoRes = new GetThreadDataDtoRes()
  updateDataArticle: UpdateArticleDtoReq = new UpdateArticleDtoReq()

  //subscription
  getDataSubscription?: Subscription
  activatedRouteSubscription?: Subscription
  updateArticleSubscription?: Subscription

  idThread:string
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private threadService: ThreadService) { }

  ngOnInit(): void {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(result => {
      this.idThread = (result as any).id
      this.getData()
    })
    this.articleData.contents = ''
  }

  getData() {
    this.getDataSubscription = this.threadService.getThreadDetail(this.idThread).subscribe(result => {
      this.articleData = result.data
    })
  }

  update(isValid:boolean){
    if(isValid){
      this.updateDataArticle.id = this.idThread
      this.updateDataArticle.title = this.articleData.title
      this.updateDataArticle.contents = this.articleData.contents
      this.updateArticleSubscription = this.threadService.updateArticle(this.updateDataArticle).subscribe(result =>{
        if(result){
          this.router.navigateByUrl('article/list')
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.getDataSubscription?.unsubscribe()
    this.activatedRouteSubscription?.unsubscribe()
    this.updateArticleSubscription?.unsubscribe()
  }
}
