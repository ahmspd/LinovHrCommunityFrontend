import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileChangePasswordComponent } from "./profile-change-password/profile-change-password.component";
import { ProfileDetailComponent } from "./profile-detail/profile-detail.component";
import { ProfileEditComponent } from "./profile-edit/profile-edit.component";
import { ProfileThreadBookmarkComponent } from "./profile-thread-bookmark/profile-thread-bookmark.component";
import { ProfileThreadLikeComponent } from "./profile-thread-like/profile-thread-like.component";
import { ProfileThreadComponent } from "./profile-thread/profile-thread.component";
import { ProfileUserPremiumComponent } from "./profile-user-premium/profile-user-premium.component";

const routes: Routes = [
    {
        path: 'detail',
        component: ProfileDetailComponent
    },
    {
        path: 'edit-profile',
        component: ProfileEditComponent
    },
    {
        path: 'premium',
        component: ProfileUserPremiumComponent
    },
    {
        path: 'change-password',
        component: ProfileChangePasswordComponent
    },
    {
        path: 'thread',
        component: ProfileThreadComponent
    },
    {
        path: 'thread-like',
        component: ProfileThreadLikeComponent
    },
    {
        path: 'thread-bookmark',
        component: ProfileThreadBookmarkComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ProfileRouter{}