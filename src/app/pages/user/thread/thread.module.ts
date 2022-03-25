import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { ThreadListComponent } from "./thread-list/thread-list.component";
import { ThreadRouter } from "./thread.router";


@NgModule({
    declarations: [
        ThreadListComponent
    ],
    imports: [
        ThreadRouter,
        RouterModule,
        ButtonModule
    ]
})
export class ThreadModule{}