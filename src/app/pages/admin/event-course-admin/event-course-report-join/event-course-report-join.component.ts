import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { GetReportEventCourseById } from 'src/app/dto/event-course/get-report-event-course-by-id';
import { GetReportEventCourseByIdRes } from "src/app/dto/event-course/get-report-event-course-by-id-res";
import { EventCourseService } from 'src/app/service/event-course.service';

@Component({
  selector: 'app-event-course-report-join',
  templateUrl: './event-course-report-join.component.html',
  styleUrls: ['./event-course-report-join.component.scss'],
  providers: [ConfirmationService]
})
export class EventCourseReportJoinComponent implements OnInit{

  reportData : GetReportEventCourseById[]=[]
  report : GetReportEventCourseByIdRes

  maxPage: number = 10
  totalRecords: number = 0
  startPage : number = 0
  loading: boolean = true
  constructor(private eventCourseService: EventCourseService, private router: Router, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    console.log(event)
    this.getData(event.first, event.rows)
  }

  async getData(startPage: number = this.startPage, maxPage: number = this.maxPage): Promise<void> {
    this.loading = true;
    
    try{
      this.report = await firstValueFrom(this.eventCourseService.getReportPageUserJoinByAdmin(startPage, maxPage))
      this.reportData = this.report.data
      this.loading = false
      this.totalRecords = this.report.total
    }
    catch(error){
      this.loading = false
    }
  }
}
