import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { ToolbarModule } from "primeng/toolbar";
import { PositionListComponent } from './position-list/position-list.component';
import { PositionRouter } from "./position.router";
import { PositionNewComponent } from './position-new/position-new.component';
import { PositionUpdateComponent } from './position-update/position-update.component';

@NgModule({
    declarations: [
    PositionListComponent,
    PositionNewComponent,
    PositionUpdateComponent
  ],
    imports: [
        PositionRouter,
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
export class PositionModule {

}