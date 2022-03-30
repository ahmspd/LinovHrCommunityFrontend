import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UpdateCategoryDtoDataRes } from 'src/app/dto/category/update-category-dto-data-res';
import { UpdateCategoryDtoReq } from 'src/app/dto/category/update-category-dto-req';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.scss']
})
export class CategoryUpdateComponent implements OnInit, OnDestroy {

  category: UpdateCategoryDtoReq = new UpdateCategoryDtoReq()

  getByIdSubscription?: Subscription
  updateSubscription?: Subscription
  acivatedRouteSubscription?: Subscription

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.acivatedRouteSubscription = this.activatedRoute.params.subscribe(result => {
      const id: string = (result as any).id
      this.getByIdSubscription = this.categoryService.getById(id).subscribe(result => {
        this.category = result.data
      })
    })
  }

  update(isValid: boolean): void {
    if (isValid) {
      this.updateSubscription = this.categoryService.update(this.category).subscribe(result => {
        if (result) {
          this.router.navigateByUrl('/category/list')
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.getByIdSubscription?.unsubscribe()
    this.updateSubscription?.unsubscribe()
    this.acivatedRouteSubscription?.unsubscribe()
  }
}
