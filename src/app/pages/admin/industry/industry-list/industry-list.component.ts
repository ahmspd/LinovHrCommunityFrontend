import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { firstValueFrom, Subscription } from 'rxjs';
import { DeleteMultipleIndustryDtoDataReq } from 'src/app/dto/industry/delete-multiple-industry-dto-data-req';
import { DeleteMultipleIndustryDtoReq } from 'src/app/dto/industry/delete-multiple-industry-dto-req';
import { GetAllIndustryPageDtoDataRes } from 'src/app/dto/industry/get-all-industry-page-dto-data-res';
import { GetAllIndustryPageDtoRes } from 'src/app/dto/industry/get-all-industry-page-dto-res';
import { IndustryService } from 'src/app/service/industry.service';

@Component({
  selector: 'app-industry-list',
  templateUrl: './industry-list.component.html',
  styleUrls: ['./industry-list.component.scss'],
  providers: [ConfirmationService]
})
export class IndustryListComponent implements OnInit{

  constructor(private industryService: IndustryService, private router: Router, private confirmationService: ConfirmationService) { }

  industries: GetAllIndustryPageDtoDataRes[] = []
  industryGetAll: GetAllIndustryPageDtoRes
  deleteIds: string[] = []
  deleteIndustry: DeleteMultipleIndustryDtoReq = new DeleteMultipleIndustryDtoReq()
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

  async getData(startPage: number = 0, maxPage: number = this.maxPage): Promise<void>  {
    this.loading = true;

    try {
      this.industryGetAll = await firstValueFrom(this.industryService.getAll(startPage, maxPage))
      this.industries = this.industryGetAll.data
      this.loading = false
      this.totalRecords = this.industryGetAll.total
    } catch (error) {
      this.loading = false
    }
  }

  update(id: string): void {
    this.router.navigateByUrl(`/industry/${id}`)
  }

  filter(text: string):void{
    this.industries = this.industries.filter(industry=>industry.industryName.includes(text))
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
    const deleteData: DeleteMultipleIndustryDtoDataReq[] = []

    this.deleteIds.forEach(value => {
      const deleteIndustryId: DeleteMultipleIndustryDtoDataReq = new DeleteMultipleIndustryDtoDataReq()
      deleteIndustryId.id = value
      deleteData.push(deleteIndustryId)
    })

    this.deleteIndustry.data = deleteData
    try {
      await firstValueFrom(this.industryService.deleteMultiple(this.deleteIndustry))
      this.getData()
    }
    catch(error){

    }
    // this.industrySubsDeleteMultiple = this.industryService.deleteMultiple(this.deleteIndustry).subscribe(result => {
    //   this.getData()
    // })
  }
}
