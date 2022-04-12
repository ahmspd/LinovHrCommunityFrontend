import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Subscription } from 'rxjs';
import { GetReportEventCourseById } from 'src/app/dto/event-course/get-report-event-course-by-id';
import { EventCourseService } from 'src/app/service/event-course.service';

@Component({
  selector: 'app-event-course-report-join',
  templateUrl: './event-course-report-join.component.html',
  styleUrls: ['./event-course-report-join.component.scss'],
  providers: [ConfirmationService]
})
export class EventCourseReportJoinComponent implements OnInit , OnDestroy{

  reportData : GetReportEventCourseById[]=[]

  getAllSubscription? : Subscription
  downloadSubscription? : Subscription
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

  getData(startPage: number = this.startPage, maxPage: number = this.maxPage): void {
    this.loading = true;

    this.getAllSubscription = this.eventCourseService.getReportPageUserJoinByAdmin(startPage, maxPage).subscribe({
      next: result => {
        const resultData: any = result
        this.reportData = resultData.data
        this.loading = false
        this.totalRecords = resultData.total
        console.log(resultData.total)
      },
      error: _ => this.loading = false
    })
  }

  downloadReport(startPage: number = 0, maxPage: number = this.maxPage): void {
    // this.router.navigateByUrl(`http://localhost:1234/event-course/page/report/admin/download?start=${startPage}&max=${maxPage}`)
    
  }

  ngOnDestroy(): void {
    this.getAllSubscription?.unsubscribe()
    this.downloadSubscription?.unsubscribe()
  }
}
