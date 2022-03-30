import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { ToolbarModule } from "primeng/toolbar";
import { PriceTypeListComponent } from './price-type-list/price-type-list.component';
import { PriceTypeNewComponent } from './price-type-new/price-type-new.component';
import { PriceTypeUpdateComponent } from './price-type-update/price-type-update.component';
import { PriceTypeRouter } from "./price-type.router";

@NgModule({
  declarations: [
    PriceTypeListComponent,
    PriceTypeNewComponent,
    PriceTypeUpdateComponent
  ],
  imports:[
      PriceTypeRouter,
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
export class PriceTypeModule {}