import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { GetAllCategoryDtoDataRes } from 'src/app/dto/category/get-all-category-dto-data-res';
import { GetAllCategoryDtoRes } from 'src/app/dto/category/get-all-category-dto-res';
import { GetAllCategoryThreadDetail } from 'src/app/dto/category/get-all-category-thread-detail';
import { InsertThreadDtoReq } from 'src/app/dto/thread/insert-thread-dto-req';
import { InsertThreadDtoRes } from 'src/app/dto/thread/insert-thread-dto-res';
import { CategoryService } from 'src/app/service/category.service';
import { ThreadService } from 'src/app/service/thread.service';
import * as ClassicEditor from 'src/ckeditor5/build/ckeditor';

@Component({
  selector: 'app-article-user-save',
  templateUrl: './article-user-save.component.html',
  styleUrls: ['./article-user-save.component.scss']
})
export class ArticleUserSaveComponent implements OnInit {
  editor: any = ClassicEditor;

  insertArticle: InsertThreadDtoReq = new InsertThreadDtoReq()
  insert : InsertThreadDtoRes

  categories: GetAllCategoryDtoDataRes[] = []
  categoryData : GetAllCategoryDtoRes
  selectCategories: GetAllCategoryThreadDetail[] = []

  idThreadType: string = '2'
  isActive: boolean = false

  file?: File

  constructor(private router: Router, private categoryService: CategoryService, private threadService: ThreadService) { }

  ngOnInit(): void {
    this.insertArticle.contents = ''
    this.getData()
  }

  async getData(): Promise<void> {
    this.categoryData = await firstValueFrom(this.categoryService.getAllCategories())
    this.categories = this.categoryData.data
  }
  async onCreate() : Promise<void> {
    this.insertArticle.idThreadType = this.idThreadType
    this.insertArticle.dataCategory = this.selectCategories
    this.insertArticle.isActive = this.isActive
    this.insert = await firstValueFrom(this.threadService.insert(this.insertArticle, this.file))
    if(this.insert.data){
      this.router.navigateByUrl('user/article/list')
    }
  }

  changeFile(event: any): void {
    this.file = event[0]
  }

  removeFile(): void {
    this.file = null
  }
}
