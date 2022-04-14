import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { firstValueFrom, Subscription } from 'rxjs';
import { DeleteMultipleCategoryDtoDataReq } from 'src/app/dto/category/delete-multiple-category-dto-data-req';
import { DeleteMultipleCategoryDtoReq } from 'src/app/dto/category/delete-multiple-category-dto-req';
import { GetAllCategoryPageDtoDataRes } from 'src/app/dto/category/get-all-category-page-dto-data-res';
import { GetAllCategoryPageDtoRes } from 'src/app/dto/category/get-all-category-page-dto-res';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  providers: [ConfirmationService]
})
export class CategoryListComponent implements OnInit {

  categories: GetAllCategoryPageDtoDataRes[] = []
  categoryData : GetAllCategoryPageDtoRes
  deleteIds: string[] = []
  deleteCategory: DeleteMultipleCategoryDtoReq = new DeleteMultipleCategoryDtoReq()

  maxPage: number = 10
  totalRecords: number = 0
  loading: boolean = true

  constructor(private router: Router, private confirmationService: ConfirmationService, private categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  loadData(event: LazyLoadEvent) {
    console.log(event)
    if (event.globalFilter) {
      this.filter(event.globalFilter)
    } else {
      this.getData(event.first, event.rows)
    }
  }
  
  filter(text: string): void {
    this.categories = this.categories.filter(category => category.categoryName.includes(text))
  }

  async getData(startPage: number = 0, maxPage: number = this.maxPage): Promise<void> {
    this.loading = true;

    try{
      this.categoryData = await firstValueFrom(this.categoryService.getAll(startPage, maxPage))
      this.categories = this.categoryData.data
      this.loading = false
      this.totalRecords = this.categoryData.total

    }catch(error){
      this.loading = false
    }
  }

  update(id: string): void {
    this.router.navigateByUrl(`/category/${id}`)
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
    const deleteData: DeleteMultipleCategoryDtoDataReq[] = []

    this.deleteIds.forEach(value => {
      const deleteIndustryId: DeleteMultipleCategoryDtoDataReq = new DeleteMultipleCategoryDtoDataReq()
      deleteIndustryId.id = value
      deleteData.push(deleteIndustryId)
    })

    this.deleteCategory.data = deleteData
    try {
      await firstValueFrom(this.categoryService.deleteMultiple(this.deleteCategory))
      this.getData()
    }
    catch (error){

    }
  }
}
