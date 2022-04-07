import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetAllCategoryDtoDataRes } from 'src/app/dto/category/get-all-category-dto-data-res';
import { GetAllEventCourseTypeDtoDataRes } from 'src/app/dto/event-course-type/get-all-event-course-type-dto-data-res';
import { InsertEventCourseDtoReq } from 'src/app/dto/event-course/insert-event-course-dto-req';
import { CategoryService } from 'src/app/service/category.service';
import { EventCourseTypeService } from 'src/app/service/event-course-type.service';
import * as moment from 'moment'
import { EventCourseService } from 'src/app/service/event-course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-course-save',
  templateUrl: './event-course-save.component.html',
  styleUrls: ['./event-course-save.component.scss']
})
export class EventCourseSaveComponent implements OnInit, OnDestroy {

  categories: GetAllCategoryDtoDataRes[] = []
  types: GetAllEventCourseTypeDtoDataRes[] = []
  insertEventCourse: InsertEventCourseDtoReq = new InsertEventCourseDtoReq()
  selectCategories: GetAllCategoryDtoDataRes[] = []
  insertCategories: String[] = []
  minDate: Date = new Date()
  file?: File

  getAllCategoriesSubscription?: Subscription
  getAllTypesSubscription?: Subscription
  insertEventCourseSubscription?: Subscription

  constructor(private categoryService: CategoryService, private eventCourseTypeService: EventCourseTypeService, private eventCourseService: EventCourseService, private router: Router) { }

  ngOnInit(): void {
    this.getAllCategoriesSubscription = this.categoryService.getAllCategories().subscribe(result => {
      this.categories = result.data
    })

    this.getAllTypesSubscription = this.eventCourseTypeService.getAll().subscribe(result => {
      this.types = result.data
    })
  }
  
  click(): void {
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

    this.insertEventCourseSubscription = this.eventCourseService.insert(this.insertEventCourse, this.file).subscribe(result => {
      this.router.navigateByUrl('/event-course/list')
    })

  }

  changeFile(event: any): void {
    this.file = event[0]
  }

  ngOnDestroy(): void {
    this.getAllCategoriesSubscription.unsubscribe()
    this.getAllTypesSubscription.unsubscribe()
    this.insertEventCourseSubscription.unsubscribe()
  }

}
