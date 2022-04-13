import { NgModule } from "@angular/core";
import { ArticleUserListComponent } from './article-user-list/article-user-list.component';
import { ArticleUserDetailComponent } from './article-user-detail/article-user-detail.component';
import { ArticleUserSaveComponent } from './article-user-save/article-user-save.component';
import { RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { TagModule } from "primeng/tag";
import { AvatarModule } from "primeng/avatar";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { InputSwitchModule } from "primeng/inputswitch";
import { MultiSelectModule } from "primeng/multiselect";
import { ProgressBarModule } from "primeng/progressbar";
import { ArticleUserRouter } from "./article.router";
import { TableModule } from "primeng/table";
import { ImageModule } from "primeng/image";
import { FileUploadModule } from "primeng/fileupload";
import { ConfirmDialogModule } from "primeng/confirmdialog";

@NgModule({
  declarations: [
    ArticleUserListComponent,
    ArticleUserDetailComponent,
    ArticleUserSaveComponent
  ],
  imports: [
    ArticleUserRouter,
    RouterModule,
    TableModule,
    ButtonModule,
    TagModule,
    AvatarModule,
    InputTextareaModule,
    InputTextModule,
    DropdownModule,
    CKEditorModule,
    FormsModule,
    CommonModule,
    InputSwitchModule,
    MultiSelectModule,
    ProgressBarModule,
    FileUploadModule,
    ImageModule,
    ConfirmDialogModule
  ]
})
export class ArticleUserModule { }