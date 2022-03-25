import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Subscription } from 'rxjs';
import { GetAllIndustryPageDtoDataRes } from 'src/app/dto/industry/get-all-industry-page-dto-data-res';
import { IndustryService } from 'src/app/service/industry.service';

@Component({
  selector: 'app-industry-list',
  templateUrl: './industry-list.component.html',
  styleUrls: ['./industry-list.component.scss']
})
export class IndustryListComponent implements OnInit {

  constructor(private industryService: IndustryService, private router: Router) { }

  industries: GetAllIndustryPageDtoDataRes[] = []
  industrySubsGetAll?: Subscription
  industrySubsDeleteById?: Subscription
  idDelete!: number

  maxPage : number = 10
  totalRecords: number = 0
  loading: boolean = true

  ngOnInit(): void {
    this.initData()
  }

  initData(): void {
    
    // this.industrySubsGetAll = this.industryService.getAll().subscribe(result => { this.industries = result.data })
  }
  
  loadData(event: LazyLoadEvent) {
    console.log(event)
    this.getData(event.first, event.rows)
  }

  getData(startPage : number = 0, maxPage : number = this.maxPage) : void {
    this.loading = true;

    //logic in reqses
    startPage = startPage != 0 ? (startPage / this.maxPage) + this.maxPage : startPage

    this.industryService.getAll(startPage, maxPage).subscribe({
      next : result => {
        const resultData : any = result
        this.industries = resultData.data
        this.loading = false
        this.totalRecords = resultData.total
      },
      error : _ => this.loading = false
    })
  }


  update(id: number): void {
    console.log(`ini id ${id}`)
    this.router.navigateByUrl(`/industry/${id}`)
  }

  deleteId(id: number): void {
    this.idDelete = id
  }

  doDelete(): void {
    this.industrySubsDeleteById = this.industryService.deleteById(this.idDelete).subscribe(result => {
      this.initData()
    })
  }

  ngOnDestroy(): void {
    this.industrySubsGetAll?.unsubscribe()
    this.industrySubsDeleteById?.unsubscribe()
  }
}
