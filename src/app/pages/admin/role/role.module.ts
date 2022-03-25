import { NgModule } from "@angular/core";
import { TableModule } from "primeng/table";
import { RoleListComponent } from './role-list/role-list.component';
import { RoleRouter } from "./role.router";

@NgModule({
    declarations: [
    RoleListComponent
  ],
    imports: [
        RoleRouter,
        TableModule
    
    ],
    providers: [],
  
})
export class RoleModule {

}