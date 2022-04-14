import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { GetAllCategoryDtoDataRes } from 'src/app/dto/category/get-all-category-dto-data-res';
import { GetAllCategoryDtoRes } from 'src/app/dto/category/get-all-category-dto-res';
import { GetAllCategoryThreadDetail } from 'src/app/dto/category/get-all-category-thread-detail';
import { InsertPollingDetailDtoReq } from 'src/app/dto/polling-detail/insert-polling-detail-dto-req';
import { InsertThreadDtoReq } from 'src/app/dto/thread/insert-thread-dto-req';
import { InsertThreadDtoRes } from 'src/app/dto/thread/insert-thread-dto-res';
import { CategoryService } from 'src/app/service/category.service';
import { LoginService } from 'src/app/service/login.service';
import { ThreadService } from 'src/app/service/thread.service';
import * as ClassicEditor from 'src/ckeditor5/build/ckeditor';

@Component({
  selector: 'app-thread-save',
  templateUrl: './thread-save.component.html',
  styleUrls: ['./thread-save.component.scss']
})
export class ThreadSaveComponent implements OnInit {
  editor: any = ClassicEditor;
  data: string = '';
  pollingDetail: string = ''
  pollingNumber: number = 2
  idThreadType : string = '1'
  isPolling: boolean = false
  isPremium: boolean = false

  categories: GetAllCategoryDtoDataRes[] = []
  categoriesData: GetAllCategoryDtoDataRes[] = []
  selectCategories: GetAllCategoryThreadDetail[] = []
  dataPolling: InsertPollingDetailDtoReq[]=[]

  getCategoryData: GetAllCategoryDtoRes

  insertThread: InsertThreadDtoReq = new InsertThreadDtoReq()
  insertData : InsertThreadDtoRes

  constructor(private router: Router, private categoryService: CategoryService, private threadService: ThreadService, private loginService : LoginService) { }

  ngOnInit(): void {
    this.insertThread.isPremium = false
    this.insertThread.contents = ''
    this.dataPolling[this.pollingNumber]
    this.isPremium = this.loginService.getData().data.isMember
    this.getData()
  }

  async getData() : Promise<void>{
    this.getCategoryData = await firstValueFrom(this.categoryService.getAllCategories())
    this.categories = this.getCategoryData.data
  }

  onCreate(isValid: boolean): void {
    if (isValid) {
      this.router.navigateByUrl('/dashboard')
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

  async click() : Promise<void> {
    if(this.isPolling){
      this.idThreadType = '4'
      this.insertThread.dataPolling = this.dataPolling
    }
    else {
      this.idThreadType = '1'
    }
    this.insertThread.idThreadType = this.idThreadType
    this.insertThread.dataCategory = this.selectCategories

    this.insertData = await firstValueFrom(this.threadService.insert(this.insertThread))
    if(this.insertData.data){
      this.router.navigateByUrl(`thread/${this.insertData.data.id}`)
    }
  }
  addPolling() : void {
    this.pollingNumber = this.pollingNumber +1
  }
  removePolling() : void {
    if(this.pollingNumber === 2){
      alert("Asdasd")
    }else {
      this.pollingNumber = this.pollingNumber -1
    }
  }
}
