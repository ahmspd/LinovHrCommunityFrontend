import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { GetAllCategoryDtoDataRes } from 'src/app/dto/category/get-all-category-dto-data-res';
import { GetAllCategoryDtoRes } from 'src/app/dto/category/get-all-category-dto-res';
import { GetAllEventCourseTypeDtoDataRes } from 'src/app/dto/event-course-type/get-all-event-course-type-dto-data-res';
import { GetAllEventCourseTypeDtoRes } from 'src/app/dto/event-course-type/get-all-event-course-type-dto-res';
import { InsertEventCourseDtoReq } from 'src/app/dto/event-course/insert-event-course-dto-req';
import { InsertEventCourseDtoRes } from 'src/app/dto/event-course/insert-event-course-dto-res';
import { GetAllThreadPageDtoRes } from 'src/app/dto/thread/get-all-thread-page-dto-res';
import { GetThreadDataDtoRes } from 'src/app/dto/thread/get-thread-data-dto-res';
import { CategoryService } from 'src/app/service/category.service';
import { EventCourseTypeService } from 'src/app/service/event-course-type.service';
import { EventCourseService } from 'src/app/service/event-course.service';
import { ThreadService } from 'src/app/service/thread.service';

@Component({
  selector: 'app-event-course-save',
  templateUrl: './event-course-save.component.html',
  styleUrls: ['./event-course-save.component.scss']
})
export class EventCourseSaveComponent implements OnInit {

  categories: GetAllCategoryDtoDataRes[] = []
  categoryData: GetAllCategoryDtoRes
  types: GetAllEventCourseTypeDtoDataRes[] = []
  typeData :GetAllEventCourseTypeDtoRes
  insertEventCourse: InsertEventCourseDtoReq = new InsertEventCourseDtoReq()
  selectCategories: GetAllCategoryDtoDataRes[] = []
  insertCategories: String[] = []
  dataArticle: GetThreadDataDtoRes[] = []
  articel: GetAllThreadPageDtoRes
  insertData : InsertEventCourseDtoRes

  minDate: Date = new Date()
  file?: File
  idType: string = '2'
  isOffline: boolean = false

  constructor(private categoryService: CategoryService, private eventCourseTypeService: EventCourseTypeService, private eventCourseService: EventCourseService, 
    private router: Router, private threadService: ThreadService) { }

  ngOnInit(): void {
    this.getData()
  }
  
  async getData(): Promise<void>{
    this.categoryData = await firstValueFrom(this.categoryService.getAllCategories())
    this.categories = this.categoryData.data
    this.typeData = await firstValueFrom(this.eventCourseTypeService.getAll())
    this.types = this.typeData.data
    this.articel = await firstValueFrom(this.threadService.getArticleActiveWithPage(this.idType, 0, 2, true))
    this.dataArticle = this.articel.data
  }

  async click(): Promise<void> {
    this.selectCategories.forEach( category => {
      this.insertCategories.push(category.id) 
    })

    this.insertEventCourse.idCategories = this.insertCategories
    this.insertEventCourse.dateStart = moment(this.insertEventCourse.dateStart).format('yyyy-MM-DD')
    this.insertEventCourse.dateEnd = moment(this.insertEventCourse.dateEnd).format('yyyy-MM-DD')
    this.insertEventCourse.timeStart = moment(this.insertEventCourse.timeStart).format('HH:mm:ss')
    this.insertEventCourse.timeEnd = moment(this.insertEventCourse.timeEnd).format('HH:mm:ss')

    if(this.insertEventCourse.idEventCourseType == '1'){
      this.insertEventCourse.idPriceList = '3'
    } else {
      this.insertEventCourse.idPriceList = '4'
    }

    if(!this.isOffline) {
      this.insertEventCourse.eventCourseLocation = 'Online'
    }
    
    this.insertData = await firstValueFrom(this.eventCourseService.insert(this.insertEventCourse, this.file))
    if(this.insertData.data){
      this.router.navigateByUrl('/event-course/cart')
    }
  }

  changeFile(event: any): void {
    this.file = event[0]
  }

  removeFile(): void {
    this.file = null
  }

}
