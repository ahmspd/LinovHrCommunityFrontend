import { NgModule } from "@angular/core";
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleNewComponent } from './article-new/article-new.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleRouter } from "./article.router";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { CommonModule } from "@angular/common";
import { ToolbarModule } from "primeng/toolbar";
import { FormsModule } from "@angular/forms";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { InputTextModule } from "primeng/inputtext";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { MultiSelectModule } from "primeng/multiselect";
import { ArticleListNotAcceptComponent } from './article-list-not-accept/article-list-not-accept.component';
import { FileUploadModule } from "primeng/fileupload";
import { ImageModule } from "primeng/image";

@NgModule({
    declarations: [
        ArticleListComponent,
        ArticleNewComponent,
        ArticleEditComponent,
        ArticleListNotAcceptComponent
    ],
    imports: [
        ArticleRouter,
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
    ],
    providers: []
})
export class ArticleModule { }