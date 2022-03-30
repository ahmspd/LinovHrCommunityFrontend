import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DeleteMultiplePositionDtoDataReq } from 'src/app/dto/position/delete-multiple-position-dto-data-req';
import { DeleteMultiplePositionDtoReq } from 'src/app/dto/position/delete-multiple-position-dto-req';
import { GetAllPositionPageDtoDataRes } from 'src/app/dto/position/get-all-position-page-dto-data-res';
import { PositionService } from 'src/app/service/position.service';

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.scss'],
  providers: [ConfirmationService]
})
export class PositionListComponent implements OnInit , OnDestroy{

  constructor(private positionService: PositionService, private router: Router, private confirmationService: ConfirmationService) { }

  positions: GetAllPositionPageDtoDataRes[] = []
  deleteIds: string[] = []
  deletePosition: DeleteMultiplePositionDtoReq = new DeleteMultiplePositionDtoReq()
  positionSubsGetAll?: Subscription
  positionSubsDeleteMultiple?: Subscription
  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    console.log(event)
    this.getData(event.first, event.rows)
  }

  getData(startPage: number = 0, maxPage: number = this.maxPage): void {
    this.loading = true;

    this.positionSubsGetAll = this.positionService.getAll(startPage, maxPage).subscribe({
      next: result => {
        const resultData: any = result
        this.positions = resultData.data
        this.loading = false
        this.totalRecords = resultData.total
      },
      error: _ => this.loading = false
    })
  }

  update(id: string): void {
    this.router.navigateByUrl(`/position/${id}`)
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
    const deleteData: DeleteMultiplePositionDtoDataReq[] = []

    this.deleteIds.forEach(value => {
      const deletePositionId: DeleteMultiplePositionDtoDataReq = new DeleteMultiplePositionDtoDataReq()
      deletePositionId.id = value
      deleteData.push(deletePositionId)
    })

    this.deletePosition.data = deleteData
    this.positionSubsDeleteMultiple = this.positionService.deleteMultiple(this.deletePosition).subscribe(result => {
      this.getData()
    })
  }

  ngOnDestroy(): void {
    this.positionSubsGetAll?.unsubscribe()
    this.positionSubsDeleteMultiple?.unsubscribe()
  }
}
