import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { StyleClassModule } from "primeng/styleclass";
import { NavbarComponent } from './navbar.component';

@NgModule({
    declarations : [
        NavbarComponent
  ],
    imports : [
        RouterModule,
        StyleClassModule,
        ButtonModule  
    ],
    exports : [
        RouterModule
    ]
})

export class NavbarModule{}