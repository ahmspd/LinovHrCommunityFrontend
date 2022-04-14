import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { firstValueFrom } from 'rxjs';
import { DeleteMultipleThreadTypeDtoDataReq } from 'src/app/dto/thread-type/delete-multiple-thread-type-dto-data-req';
import { DeleteMultipleThreadTypeDtoReq } from 'src/app/dto/thread-type/delete-multiple-thread-type-dto-req';
import { GetAllThreadTypePageDtoDataRes } from 'src/app/dto/thread-type/get-all-thread-type-page-dto-data-res';
import { GetAllThreadTypePageDtoRes } from 'src/app/dto/thread-type/get-all-thread-type-page-dto-res';
import { ThreadTypeService } from 'src/app/service/thread-type.service';

@Component({
  selector: 'app-thread-type-list',
  templateUrl: './thread-type-list.component.html',
  styleUrls: ['./thread-type-list.component.scss'],
  providers: [ConfirmationService]
})
export class ThreadTypeListComponent implements OnInit {

  threadTypes: GetAllThreadTypePageDtoDataRes[] = []
  threadTypeData: GetAllThreadTypePageDtoRes
  deleteIds: string[] = []
  deleteThreadType: DeleteMultipleThreadTypeDtoReq = new DeleteMultipleThreadTypeDtoReq()

  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private router: Router, private confirmationService: ConfirmationService, private threadTypeService: ThreadTypeService) { }

  ngOnInit(): void {
  }
  loadData(event: LazyLoadEvent) {
   if(event.globalFilter){
     this.filter(event.globalFilter)
   } else {
     this.getData(event.first, event.rows)
   }
  }

  filter(text: string){
    this.threadTypes = this.threadTypes.filter(list=>list.threadTypeName.includes(text))
  }

  async getData(startPage: number = 0, maxPage: number = this.maxPage): Promise<void> {
    this.loading = true;

    try {
      this.threadTypeData = await firstValueFrom(this.threadTypeService.getAll(startPage, maxPage))
      this.threadTypes = this.threadTypeData.data
      this.loading = false
      this.totalRecords = this.threadTypeData.total
    } catch(error){
      this.loading = false
    }
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

  async doDelete(): Promise<void> {
    const deleteData: DeleteMultipleThreadTypeDtoDataReq[] = []

    this.deleteIds.forEach(value => {
      const deleteIndustryId: DeleteMultipleThreadTypeDtoDataReq = new DeleteMultipleThreadTypeDtoDataReq()
      deleteIndustryId.id = value
      deleteData.push(deleteIndustryId)
    })

    this.deleteThreadType.data = deleteData
    try {
      await firstValueFrom(this.threadTypeService.deleteMultiple(this.deleteThreadType))
      this.getData()
    } catch(error) {

    }
  }
  
}
