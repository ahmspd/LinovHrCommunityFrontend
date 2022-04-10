import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetAllCategoryDtoDataRes } from 'src/app/dto/category/get-all-category-dto-data-res';
import { GetAllCategoryThreadDetail } from 'src/app/dto/category/get-all-category-thread-detail';
import { InsertThreadDtoReq } from 'src/app/dto/thread/insert-thread-dto-req';
import { CategoryService } from 'src/app/service/category.service';
import { ThreadService } from 'src/app/service/thread.service';
import * as ClassicEditor from 'src/ckeditor5/build/ckeditor';

@Component({
  selector: 'app-article-user-save',
  templateUrl: './article-user-save.component.html',
  styleUrls: ['./article-user-save.component.scss']
})
export class ArticleUserSaveComponent implements OnInit, OnDestroy {
  editor: any = ClassicEditor;

  insertArticle: InsertThreadDtoReq = new InsertThreadDtoReq()

  getAllCategoriesSubscription?: Subscription
  insertArticleSubscription?: Subscription

  categories: GetAllCategoryDtoDataRes[] = []
  selectCategories: GetAllCategoryThreadDetail[] = []

  idThreadType: string = '2'
  isActive: boolean = false

  file?: File

  constructor(private router: Router, private categoryService: CategoryService, private threadService: ThreadService) { }

  ngOnInit(): void {
    this.getAllCategoriesSubscription = this.categoryService.getAllCategories().subscribe(result => {
      this.categories = result.data
    })
    this.insertArticle.contents = ''

  }

  onCreate() {
    this.insertArticle.idThreadType = this.idThreadType
    this.insertArticle.dataCategory = this.selectCategories
    this.insertArticle.isActive = this.isActive
    this.insertArticleSubscription = this.threadService.insert(this.insertArticle, this.file).subscribe(result => {
      if (result) {
        this.router.navigateByUrl('user/article/list')
      }
    })
  }

  changeFile(event: any): void {
    this.file = event[0]
  }

  ngOnDestroy(): void {
    this.getAllCategoriesSubscription?.unsubscribe()
    this.insertArticleSubscription?.unsubscribe()
  }
}
