import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InsertCategoryDtoReq } from 'src/app/dto/category/insert-category-dto-req';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.scss']
})
export class CategoryNewComponent implements OnInit , OnDestroy{

  category: InsertCategoryDtoReq = new InsertCategoryDtoReq()

  insertSubscription? : Subscription

  constructor(private router : Router, private categoryService : CategoryService) { }

  ngOnInit(): void {
  }

  insert(isValid : boolean) : void {
    if(isValid) {
      this.insertSubscription = this.categoryService.insert(this.category).subscribe(result => {
        if(result) {
          this.router.navigateByUrl('/category/list')
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.insertSubscription?.unsubscribe()
  }
}
