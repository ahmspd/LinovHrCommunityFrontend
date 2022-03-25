import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  data: any[] = []

  maxPage : number = 10
  totalRecords: number = 0
  // loading: boolean = false

  constructor() { }

  // loadData(event: LazyLoadEvent) {
  //   console.log(event)
  //   this.getData(event.first, event.rows)
  // }

  getData(startPage : number = 0, maxPage : number = this.maxPage) : void {
    // this.loading = true;

    //logic in reqses
    // startPage = startPage != 0 ? (startPage / this.maxPage) + 1 : startPage

 

    // this.dataService.getAll(startPage, maxPage).subscribe({
    //   next : result => {
    //     const resultData : any = result
    //     this.data = resultData.data
    //     this.loading = false
    //     this.totalRecords = resultData.total
    //   },
    //   error : _ => this.loading = false
    // })
  }

  ngOnInit(): void {
    this.data = [
      {
        id: 1,
        roleName: "Admin",
        roleCode: "ADM"
      },
      {
        id: 2,
        roleName: "Writer",
        roleCode: "WRT"
      },
      {
        id: 3,
        roleName: "User",
        roleCode: "USR"
      },
    ]
  }
}
