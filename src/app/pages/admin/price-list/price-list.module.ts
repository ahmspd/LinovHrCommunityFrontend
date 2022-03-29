import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { ToolbarModule } from "primeng/toolbar";
import { PriceListListComponent } from './price-list-list/price-list-list.component';
import { PriceListNewComponent } from './price-list-new/price-list-new.component';
import { PriceListUpdateComponent } from './price-list-update/price-list-update.component';
import { PriceListRouter } from "./price-list.router";

@NgModule({
  declarations: [
    PriceListListComponent,
    PriceListNewComponent,
    PriceListUpdateComponent
  ],
  imports:[
      PriceListRouter,
      TableModule,
      ButtonModule,
      CommonModule,
      ToolbarModule,
      FormsModule,
      ConfirmDialogModule,
      InputTextModule,
      DropdownModule
    ],
    providers: [],
})
export class PriceListModule{}