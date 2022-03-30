import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoryListComponent } from "./category-list/category-list.component";
import { CategoryNewComponent } from "./category-new/category-new.component";
import { CategoryUpdateComponent } from "./category-update/category-update.component";

const routes: Routes = [
    {
        path: 'list',
        component: CategoryListComponent
    }, 
    {
        path: 'new',
        component: CategoryNewComponent
    },
    {
        path: ':id',
        component: CategoryUpdateComponent
    }
]
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class CategoryRouter{}