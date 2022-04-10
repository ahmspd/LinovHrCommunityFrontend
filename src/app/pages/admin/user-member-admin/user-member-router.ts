import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserMemberAdminListComponent } from "./user-member-admin-list/user-member-admin-list.component";

const routes : Routes = [
    {
        path: 'list',
        component: UserMemberAdminListComponent
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
export class UserMemberAdminRouter {
}