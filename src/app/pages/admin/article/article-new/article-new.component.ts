import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { GetAllCategoryDtoDataRes } from 'src/app/dto/category/get-all-category-dto-data-res';
import { GetAllCategoryDtoRes } from 'src/app/dto/category/get-all-category-dto-res';
import { GetAllCategoryThreadDetail } from 'src/app/dto/category/get-all-category-thread-detail';
import { InsertThreadDtoReq } from 'src/app/dto/thread/insert-thread-dto-req';
import { InsertThreadDtoRes } from 'src/app/dto/thread/insert-thread-dto-res';
import { CategoryService } from 'src/app/service/category.service';
import { LoginService } from 'src/app/service/login.service';
import { ThreadService } from 'src/app/service/thread.service';
import * as ClassicEditor from 'src/ckeditor5/build/ckeditor';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.scss']
})
export class ArticleNewComponent implements OnInit {
  editor: any = ClassicEditor;

  insertArticle: InsertThreadDtoReq = new InsertThreadDtoReq()
  categories: GetAllCategoryDtoDataRes[] = []
  categoryData : GetAllCategoryDtoRes
  selectCategories: GetAllCategoryThreadDetail[] = []

  insertThreadData : InsertThreadDtoRes

  idThreadType: string = '2'

  file?: File

  constructor(private router:Router, private loginService : LoginService, private categoryService : CategoryService,
              private threadService : ThreadService) { }

  ngOnInit(): void {
    this.getDataCategories()
    this.insertArticle.contents = ''
  }

  async getDataCategories() : Promise<void>{
    this.categoryData = await firstValueFrom(this.categoryService.getAllCategories())
    this.categories = this.categoryData.data
  }

  changeFile(event: any): void {
    this.file = event[0]
  }

  async insert(isValid: boolean) : Promise<void>{
    if(isValid){
      this.insertArticle.idThreadType = this.idThreadType
      this.insertArticle.dataCategory = this.selectCategories
      this.insertThreadData = await firstValueFrom(this.threadService.insert(this.insertArticle, this.file))
      if(this.insertThreadData.data){
        this.router.navigateByUrl('article/list')
      }
    }
  }
}
