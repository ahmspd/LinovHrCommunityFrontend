import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
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
        ButtonModule,
        FormsModule,
        CommonModule
    ],
    exports : [
        RouterModule
    ]
})

export class NavbarModule{}