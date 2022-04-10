import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { FileUploadModule } from "primeng/fileupload";
import { ImageModule } from "primeng/image";
import { InputTextModule } from "primeng/inputtext";
import { MultiSelectModule } from "primeng/multiselect";
import { TableModule } from "primeng/table";
import { ToolbarModule } from "primeng/toolbar";
import { HomepageComponent } from './homepage.component';
import { HomepageRouter } from "./homepage.router";

@NgModule({
    declarations: [
        HomepageComponent
    ],
    imports: [
        RouterModule,
        HomepageRouter,
        TableModule,
        ButtonModule,
        CommonModule,
        ToolbarModule,
        FormsModule,
        ConfirmDialogModule,
        InputTextModule,
        CKEditorModule,
        MultiSelectModule,
        FileUploadModule,
        ImageModule
    ]
})

export class HomepageModule { }