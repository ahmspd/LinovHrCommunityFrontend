import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetAllCategoryDtoDataRes } from 'src/app/dto/category/get-all-category-dto-data-res';
import { GetAllCategoryThreadDetail } from 'src/app/dto/category/get-all-category-thread-detail';
import { InsertCategoryDtoDataRes } from 'src/app/dto/category/insert-category-dto-data-res';
import { InsertPollingDetailDtoReq } from 'src/app/dto/polling-detail/insert-polling-detail-dto-req';
import { InsertThreadDtoReq } from 'src/app/dto/thread/insert-thread-dto-req';
import { InsertThreadDtoRes } from 'src/app/dto/thread/insert-thread-dto-res';
import { CategoryService } from 'src/app/service/category.service';
import { ThreadService } from 'src/app/service/thread.service';
import * as ClassicEditor from 'src/ckeditor5/build/ckeditor';

@Component({
  selector: 'app-thread-save',
  templateUrl: './thread-save.component.html',
  styleUrls: ['./thread-save.component.scss']
})
export class ThreadSaveComponent implements OnInit, OnDestroy {
  editor: any = ClassicEditor;
  data: string = '';
  pollingDetail: string = ''
  pollingNumber: number = 2
  // isPremium: boolean = false;
  isPolling: boolean = false;

  categories: GetAllCategoryDtoDataRes[] = []
  categoriesData: GetAllCategoryDtoDataRes[] = []
  categoriesData2: GetAllCategoryDtoDataRes = new GetAllCategoryDtoDataRes()
  selectCategories: GetAllCategoryThreadDetail[] = []
  dataPolling: InsertPollingDetailDtoReq[]=[]
  // selectCategories : GetAllCategoryDtoDataRes[]=[]

  getAllCategoriesSubscription?: Subscription
  insertSubscription?: Subscription

  insertThread: InsertThreadDtoReq = new InsertThreadDtoReq()

  constructor(private router: Router, private categoryService: CategoryService, private threadService: ThreadService) { }

  ngOnInit(): void {
    this.getAllCategoriesSubscription = this.categoryService.getAllCategories().subscribe(result => {
      this.categories = result.data
    })
    this.insertThread.isPremium = false
    this.insertThread.contents = ''
    this.dataPolling[this.pollingNumber]
  }

  onCreate(isValid: boolean): void {
    if (isValid) {
      // this.loginService.login(this.login).subscribe(result => {
      //   console.log(result)
      // this.loginService.saveData(result)
      this.router.navigateByUrl('/dashboard')
      // })
    }
  }
  counter(i: number) {
    return new Array(i);
  }

  pollingChange(index : number,data:any){
    let pollingData : InsertPollingDetailDtoReq = new InsertPollingDetailDtoReq()
    pollingData.pollingName = data
    console.log(pollingData)
    this.dataPolling.splice(index, 1, pollingData)
  }

  click() {
    console.log(this.dataPolling)
    // this.insertThread.idThreadType = '1'
    // this.insertThread.dataCategory = this.selectCategories
    // this.insertSubscription = this.threadService.insert(this.insertThread).subscribe(result => {
    //   console.log(result.data)
    // })
  }
  ngOnDestroy(): void {
    this.getAllCategoriesSubscription?.unsubscribe()
  }
}
