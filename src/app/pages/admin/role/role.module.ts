import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ButtonModule } from "primeng/button";
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
    //bootstrap: [AppComponent]
  
})
export class RoleModule {

}