import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Subscription } from 'rxjs';
import { GetAllRolePageDtoDataRes } from 'src/app/dto/role/get-all-role-page-dto-data-res';
import { RoleService } from 'src/app/service/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  roles: GetAllRolePageDtoDataRes[] = []
  roleSubsGetAll?: Subscription
  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private roleService: RoleService) { }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    console.log(event)
    this.getData(event.first, event.rows)
  }

  getData(startPage: number = 0, maxPage: number = this.maxPage): void {
    this.loading = true;

    this.roleService.getAll(startPage, maxPage).subscribe({
      next: result => {
        const resultData: any = result
        this.roles = resultData.data
        this.loading = false
        this.totalRecords = resultData.total
      },
      error: _ => this.loading = false
    })
  }
}
