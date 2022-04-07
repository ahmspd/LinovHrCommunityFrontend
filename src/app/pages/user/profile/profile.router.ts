import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileChangePasswordComponent } from "./profile-change-password/profile-change-password.component";
import { ProfileDetailComponent } from "./profile-detail/profile-detail.component";
import { ProfileEditComponent } from "./profile-edit/profile-edit.component";
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