import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { ToolbarModule } from "primeng/toolbar";
import { ThreadTypeListComponent } from './thread-type-list/thread-type-list.component';
import { ThreadTypeNewComponent } from './thread-type-new/thread-type-new.component';
import { ThreadTypeUpdateComponent } from './thread-type-update/thread-type-update.component';
import { ThreadTypeRouter } from "./thread-type.router";

@NgModule({
  declarations: [
    ThreadTypeListComponent,
    ThreadTypeNewComponent,
    ThreadTypeUpdateComponent
  ],
  imports:[
      ThreadTypeRouter,
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
export class ThreadTypeModule{}