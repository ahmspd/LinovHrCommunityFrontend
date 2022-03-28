import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DeleteMultipleIndustryDtoDataReq } from 'src/app/dto/industry/delete-multiple-industry-dto-data-req';
import { DeleteMultipleIndustryDtoReq } from 'src/app/dto/industry/delete-multiple-industry-dto-req';
import { GetAllIndustryPageDtoDataRes } from 'src/app/dto/industry/get-all-industry-page-dto-data-res';
import { IndustryService } from 'src/app/service/industry.service';

@Component({
  selector: 'app-industry-list',
  templateUrl: './industry-list.component.html',
  styleUrls: ['./industry-list.component.scss'],
  providers: [ConfirmationService]
})
export class IndustryListComponent implements OnInit {

  constructor(private industryService: IndustryService, private router: Router, private confirmationService: ConfirmationService) { }

  industries: GetAllIndustryPageDtoDataRes[] = []
  deleteIds: string[] = []
  deleteIndustry: DeleteMultipleIndustryDtoReq = new DeleteMultipleIndustryDtoReq()
  industrySubsGetAll?: Subscription
  industrySubsDeleteMultiple?: Subscription
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

    this.industryService.getAll(startPage, maxPage).subscribe({
      next: result => {
        const resultData: any = result
        this.industries = resultData.data
        this.loading = false
        this.totalRecords = resultData.total
      },
      error: _ => this.loading = false
    })
  }

  update(id: number): void {
    this.router.navigateByUrl(`/industry/${id}`)
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
    const deleteData: DeleteMultipleIndustryDtoDataReq[] = []

    this.deleteIds.forEach(value => {
      const deleteIndustryId: DeleteMultipleIndustryDtoDataReq = new DeleteMultipleIndustryDtoDataReq()
      deleteIndustryId.id = value
      deleteData.push(deleteIndustryId)
    })

    this.deleteIndustry.data = deleteData
    this.industrySubsDeleteMultiple = this.industryService.deleteMultiple(this.deleteIndustry).subscribe(result => {
      this.getData()
    })
  }

  ngOnDestroy(): void {
    this.industrySubsGetAll?.unsubscribe()
    this.industrySubsDeleteMultiple?.unsubscribe()
  }
}
