import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Observable, Subscription, firstValueFrom } from 'rxjs';
import { DeleteMultiplePositionDtoDataReq } from 'src/app/dto/position/delete-multiple-position-dto-data-req';
import { DeleteMultiplePositionDtoReq } from 'src/app/dto/position/delete-multiple-position-dto-req';
import { GetAllPositionPageDtoDataRes } from 'src/app/dto/position/get-all-position-page-dto-data-res';
import { GetAllPositionPageDtoRes } from 'src/app/dto/position/get-all-position-page-dto-res';
import { PositionService } from 'src/app/service/position.service';

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.scss'],
  providers: [ConfirmationService]
})
export class PositionListComponent implements OnInit {

  constructor(private positionService: PositionService, private router: Router, private confirmationService: ConfirmationService) { }

  positions: GetAllPositionPageDtoDataRes[] = []
  positionGetAll: GetAllPositionPageDtoRes
  
  deleteIds: string[] = []
  deletePosition: DeleteMultiplePositionDtoReq = new DeleteMultiplePositionDtoReq()

  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    console.log(event)
    if(event.globalFilter){
      this.filter(event.globalFilter)
    }else {
      this.getData(event.first, event.rows)
    }
  }

  filter(text: string):void{
    this.positions = this.positions.filter(position=>position.positionName.includes(text))
  }

  async getData(startPage: number = 0, maxPage: number = this.maxPage): Promise<void> {
    this.loading = true;

    try {
      this.positionGetAll = await firstValueFrom(this.positionService.getAll(startPage, maxPage))
      console.log(this.positionGetAll)
      this.positions = this.positionGetAll.data
      this.loading = false
      this.totalRecords = this.positionGetAll.total
      
    } catch (error) {
      this.loading = false
    }
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

  async doDelete(): Promise<void> {
    const deleteData: DeleteMultiplePositionDtoDataReq[] = []

    this.deleteIds.forEach(value => {
      const deletePositionId: DeleteMultiplePositionDtoDataReq = new DeleteMultiplePositionDtoDataReq()
      deletePositionId.id = value
      deleteData.push(deletePositionId)
    })

    this.deletePosition.data = deleteData

    try {
      await firstValueFrom(this.positionService.deleteMultiple(this.deletePosition))
      this.getData()
    } catch (error) {
      
    }
  }

}
