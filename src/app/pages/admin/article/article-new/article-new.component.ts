import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetAllCategoryDtoDataRes } from 'src/app/dto/category/get-all-category-dto-data-res';
import { GetAllCategoryThreadDetail } from 'src/app/dto/category/get-all-category-thread-detail';
import { InsertThreadDtoReq } from 'src/app/dto/thread/insert-thread-dto-req';
import { CategoryService } from 'src/app/service/category.service';
import { LoginService } from 'src/app/service/login.service';
import { ThreadService } from 'src/app/service/thread.service';
import * as ClassicEditor from 'src/ckeditor5/build/ckeditor';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.scss']
})
export class ArticleNewComponent implements OnInit , OnDestroy{
  editor: any = ClassicEditor;

  insertArticle: InsertThreadDtoReq = new InsertThreadDtoReq()
  categories: GetAllCategoryDtoDataRes[] = []
  selectCategories: GetAllCategoryThreadDetail[] = []

  insertArticleSubscription? : Subscription
  getAllCategoriesSubscription?: Subscription

  idThreadType: string = '2'

  file?: File

  constructor(private router:Router, private loginService : LoginService, private categoryService : CategoryService,
              private threadService : ThreadService) { }

  ngOnInit(): void {
    this.getAllCategoriesSubscription = this.categoryService.getAllCategories().subscribe(result => {
      this.categories = result.data
    })
    this.insertArticle.contents = ''
  }

  changeFile(event: any): void {
    this.file = event[0]
  }

  insert(isValid: boolean){
    if(isValid){
      this.insertArticle.idThreadType = this.idThreadType
      this.insertArticle.dataCategory = this.selectCategories
      this.insertArticleSubscription = this.threadService.insert(this.insertArticle, this.file).subscribe(result=>{
        if(result){
          this.router.navigateByUrl('article/list')
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.insertArticleSubscription?.unsubscribe()
    this.getAllCategoriesSubscription?.unsubscribe()
  }
}
