import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomepageComponent } from './homepage.component';
import { HomepageRouter } from "./homepage.router";

@NgModule({
    declarations: [
        HomepageComponent
    ],
    imports: [
        RouterModule,
        HomepageRouter
    ]
})

export class HomepageModule { }