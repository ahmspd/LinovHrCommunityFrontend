import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { firstValueFrom, Subscription } from 'rxjs';
import { GetAllRolePageDtoDataRes } from 'src/app/dto/role/get-all-role-page-dto-data-res';
import { GetAllRolePageDtoRes } from 'src/app/dto/role/get-all-role-page-dto-res';
import { RoleService } from 'src/app/service/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  roles: GetAllRolePageDtoDataRes[] = []
  rolesGetAll: GetAllRolePageDtoRes
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

  async getData(startPage: number = 0, maxPage: number = this.maxPage): Promise<void> {
    this.loading = true;

    try {
      this.rolesGetAll = await firstValueFrom(this.roleService.getAll(startPage, maxPage))
      this.roles = this.rolesGetAll.data
      this.loading = false
      this.totalRecords = this.rolesGetAll.total
    } catch (error) {
      this.loading = false
    }
  }
}
