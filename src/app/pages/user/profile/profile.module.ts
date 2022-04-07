import { NgModule } from "@angular/core";
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileUserPremiumComponent } from './profile-user-premium/profile-user-premium.component';
import { ProfileRouter } from "./profile.router";
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import {DropdownModule} from 'primeng/dropdown';
import { InputSwitchModule } from "primeng/inputswitch";
import {RippleModule} from 'primeng/ripple';
import { ButtonModule } from "primeng/button";
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {DividerModule} from 'primeng/divider';
import { ProfileChangePasswordComponent } from './profile-change-password/profile-change-password.component';
import {PasswordModule} from 'primeng/password';

@NgModule({
  declarations: [
    ProfileDetailComponent,
    ProfileEditComponent,
    ProfileUserPremiumComponent,
    ProfileChangePasswordComponent
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
    PasswordModule
  ]
})
export class ProfileModule { }