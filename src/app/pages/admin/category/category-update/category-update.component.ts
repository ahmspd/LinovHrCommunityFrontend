import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';
import { GetByIdCategoryDtoRes } from 'src/app/dto/category/get-by-id-category-dto-res';
import { UpdateCategoryDtoReq } from 'src/app/dto/category/update-category-dto-req';
import { UpdateCategoryDtoRes } from 'src/app/dto/category/update-category-dto-res';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.scss']
})
export class CategoryUpdateComponent implements OnInit {

  category: UpdateCategoryDtoReq = new UpdateCategoryDtoReq()
  categoryData : GetByIdCategoryDtoRes
  updateCategory: UpdateCategoryDtoRes

  idCategory: string

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getData()
  }

  async getData() : Promise<void> {
    try{
      const result = await firstValueFrom(this.activatedRoute.params.pipe(map(result => result)))
      this.idCategory = (result as any).id
      this.categoryData = await firstValueFrom(this.categoryService.getById(this.idCategory))
      this.category = this.categoryData.data
    }
    catch (error){

    }
  }

  async update(isValid: boolean): Promise<void> {
    if (isValid) {
      try{
        this.updateCategory = await firstValueFrom(this.categoryService.update(this.category))
        if(this.updateCategory.data){
          this.router.navigateByUrl('/category/list')
        }
      }
      catch(error){

      }
    }
  }
}
