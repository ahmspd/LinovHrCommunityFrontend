import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { HomepageComponent } from './homepage.component';
import { HomepageRouter } from "./homepage.router";

@NgModule({
    declarations: [
        HomepageComponent
    ],
    imports: [
        RouterModule,
        HomepageRouter,
        ButtonModule
    ]
})

export class HomepageModule { }