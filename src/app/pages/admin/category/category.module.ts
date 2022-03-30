import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { ToolbarModule } from "primeng/toolbar";
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryNewComponent } from './category-new/category-new.component';
import { CategoryUpdateComponent } from './category-update/category-update.component';
import { CategoryRouter } from "./category.router";

@NgModule({
    declarations: [
        CategoryListComponent,
        CategoryNewComponent,
        CategoryUpdateComponent
    ],
    imports: [
        CategoryRouter,
        TableModule,
        ButtonModule,
        CommonModule,
        ToolbarModule,
        FormsModule,
        ConfirmDialogModule,
        InputTextModule
    ],
    providers: [],
})
export class CategoryModule { }