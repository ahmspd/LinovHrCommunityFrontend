import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DeleteMultipleThreadTypeDtoDataReq } from 'src/app/dto/thread-type/delete-multiple-thread-type-dto-data-req';
import { DeleteMultipleThreadTypeDtoReq } from 'src/app/dto/thread-type/delete-multiple-thread-type-dto-req';
import { GetAllThreadTypePageDtoDataRes } from 'src/app/dto/thread-type/get-all-thread-type-page-dto-data-res';
import { ThreadTypeService } from 'src/app/service/thread-type.service';

@Component({
  selector: 'app-thread-type-list',
  templateUrl: './thread-type-list.component.html',
  styleUrls: ['./thread-type-list.component.scss'],
  providers: [ConfirmationService]
})
export class ThreadTypeListComponent implements OnInit, OnDestroy {

  threadTypes: GetAllThreadTypePageDtoDataRes[] = []
  deleteIds: string[] = []
  deleteThreadType: DeleteMultipleThreadTypeDtoReq = new DeleteMultipleThreadTypeDtoReq()

  threadTypeGetAllSubscription?: Subscription
  deleteMultipleSubscription?: Subscription
  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private router: Router, private confirmationService: ConfirmationService, private threadTypeService: ThreadTypeService) { }

  ngOnInit(): void {
  }
  loadData(event: LazyLoadEvent) {
    console.log(event)
    this.getData(event.first, event.rows)
  }

  getData(startPage: number = 0, maxPage: number = this.maxPage): void {
    this.loading = true;

    this.threadTypeGetAllSubscription = this.threadTypeService.getAll(startPage, maxPage).subscribe({
      next: result => {
        const resultData: any = result
        this.threadTypes = resultData.data
        this.loading = false
        this.totalRecords = resultData.total
      },
      error: _ => this.loading = false
    })
  }

  update(id: string): void {
    this.router.navigateByUrl(`/thread-type/${id}`)
  }

  confirm(): void {
    this.confirmationService.confirm({
      key: 'confirm',
      message: 'Are you sure to delete these data?',
      accept: () => {
        this.doDelete()
      },
      reject: () => {
        this.getData()
      }
    });
  }

  doDelete(): void {
    const deleteData: DeleteMultipleThreadTypeDtoDataReq[] = []

    this.deleteIds.forEach(value => {
      const deleteIndustryId: DeleteMultipleThreadTypeDtoDataReq = new DeleteMultipleThreadTypeDtoDataReq()
      deleteIndustryId.id = value
      deleteData.push(deleteIndustryId)
    })

    this.deleteThreadType.data = deleteData
    this.deleteMultipleSubscription = this.threadTypeService.deleteMultiple(this.deleteThreadType).subscribe(result => {
      this.getData()
    })
  }
  ngOnDestroy(): void {
    this.threadTypeGetAllSubscription?.unsubscribe()
    this.deleteMultipleSubscription?.unsubscribe()
  }
}
