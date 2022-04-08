import { NgModule } from "@angular/core";
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileUserPremiumComponent } from './profile-user-premium/profile-user-premium.component';
import { ProfileRouter } from "./profile.router";
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from "primeng/inputswitch";
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from "primeng/button";
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';
import { ProfileChangePasswordComponent } from './profile-change-password/profile-change-password.component';
import { PasswordModule } from 'primeng/password';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProfileThreadComponent } from './profile-thread/profile-thread.component';
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { AvatarModule } from "primeng/avatar";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ProgressBarModule } from "primeng/progressbar";
import { MultiSelectModule } from "primeng/multiselect";
import { ProfileThreadLikeComponent } from './profile-thread-like/profile-thread-like.component';
import { ProfileThreadBookmarkComponent } from './profile-thread-bookmark/profile-thread-bookmark.component';
import { ProfileForgotPasswordComponent } from './profile-forgot-password/profile-forgot-password.component';


@NgModule({
  declarations: [
    ProfileDetailComponent,
    ProfileEditComponent,
    ProfileUserPremiumComponent,
    ProfileChangePasswordComponent,
    ProfileThreadComponent,
    ProfileThreadLikeComponent,
    ProfileThreadBookmarkComponent,
    ProfileForgotPasswordComponent
  ],
  imports: [
    ProfileRouter,
    FileUploadModule,
    HttpClientModule,
    DropdownModule,
    InputSwitchModule,
    RippleModule,
    ButtonModule,
    MessageModule,
    MessagesModule,
    DividerModule,
    PasswordModule,
    ConfirmDialogModule,
    TableModule,
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
    ProgressBarModule
  ]
})
export class ProfileModule { }