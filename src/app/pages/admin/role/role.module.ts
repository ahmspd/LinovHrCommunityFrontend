import { NgModule } from "@angular/core";
import { RoleListComponent } from './role-list/role-list.component';
import { RoleRouter } from "./role.router";

@NgModule({
    declarations: [
    RoleListComponent
  ],
    imports: [
        RoleRouter
    ]
})
export class RoleModule {

}