import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, firstValueFrom, map, Subscription } from 'rxjs';
import { GetThreadDataDtoRes } from 'src/app/dto/thread/get-thread-data-dto-res';
import { GetThreadDetailDtoRes } from 'src/app/dto/thread/get-thread-detail-dto-res';
import { UpdateArticleDtoReq } from 'src/app/dto/thread/update-article-dto-req';
import { UpdateArticleDtoRes } from 'src/app/dto/thread/update-article-dto-res';
import { ThreadService } from 'src/app/service/thread.service';
import * as ClassicEditor from 'src/ckeditor5/build/ckeditor';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit {
  editor: any = ClassicEditor;

  articleData: GetThreadDataDtoRes = new GetThreadDataDtoRes()
  articleListData : GetThreadDetailDtoRes

  updateDataArticle: UpdateArticleDtoReq = new UpdateArticleDtoReq()
  updateArticle : UpdateArticleDtoRes

  idThread:string
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private threadService: ThreadService) { }

  ngOnInit(): void {
    this.getData()
    this.articleData.contents = ''
  }

  async getData() : Promise<void> {
    try{
      const result = await firstValueFrom(this.activatedRoute.params.pipe(map(result => result)))
      this.idThread = (result as any).id
      this.articleListData = await firstValueFrom(this.threadService.getThreadDetail(this.idThread))
      this.articleData = this.articleListData.data
    }
    catch(error){}
  }

  async update(isValid:boolean) : Promise<void>{
    if(isValid){
      this.updateDataArticle.id = this.idThread
      this.updateDataArticle.title = this.articleData.title
      this.updateDataArticle.contents = this.articleData.contents
      this.updateArticle = await firstValueFrom(this.threadService.updateArticle(this.updateDataArticle))
      if(this.updateArticle.data){
        this.router.navigateByUrl('article/list')
      }
    }
  }

}
