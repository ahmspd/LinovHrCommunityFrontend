import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ImageModule } from "primeng/image";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { ToolbarModule } from "primeng/toolbar";
import { UserMemberAdminListComponent } from './user-member-admin-list/user-member-admin-list.component';
import { UserMemberAdminRouter } from "./user-member-router";
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  declarations: [
    UserMemberAdminListComponent
  ],
  imports: [
      UserMemberAdminRouter,
      TableModule,
      ButtonModule,
      CommonModule,
      ToolbarModule,
      FormsModule,
      ConfirmDialogModule,
      InputTextModule,
      ImageModule,
      RadioButtonModule
    ],
    providers: [],
})
export class UserMemberAdminModule{}