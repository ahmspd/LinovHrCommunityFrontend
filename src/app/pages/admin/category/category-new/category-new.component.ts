import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { InsertCategoryDtoReq } from 'src/app/dto/category/insert-category-dto-req';
import { InsertCategoryDtoRes } from 'src/app/dto/category/insert-category-dto-res';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.scss']
})
export class CategoryNewComponent implements OnInit{

  category: InsertCategoryDtoReq = new InsertCategoryDtoReq()
  categoryInsert: InsertCategoryDtoRes

  constructor(private router : Router, private categoryService : CategoryService) { }

  ngOnInit(): void {
  }

  async insert(isValid : boolean) : Promise<void> {
    if(isValid) {
      this.categoryInsert = await firstValueFrom(this.categoryService.insert(this.category))
      if(this.categoryInsert.data){
        this.router.navigateByUrl('/category/list')
      }
    }
  }
}
