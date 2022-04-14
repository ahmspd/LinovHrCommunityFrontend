import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ImageModule } from "primeng/image";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { ToolbarModule } from "primeng/toolbar";
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashbordRouter } from "./dashboard.router";

@NgModule({
    declarations: [
        DashboardAdminComponent
    ],
    imports: [
        DashbordRouter,
        TableModule,
        ButtonModule,
        CommonModule,
        ToolbarModule,
        FormsModule,
        ConfirmDialogModule,
        InputTextModule,
        ImageModule,
    ]
})
export class DashboardModule { }