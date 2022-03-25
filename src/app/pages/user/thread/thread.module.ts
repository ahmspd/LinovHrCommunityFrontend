import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { TagModule } from "primeng/tag";
import { ThreadListComponent } from "./thread-list/thread-list.component";
import { ThreadRouter } from "./thread.router";


@NgModule({
    declarations: [
        ThreadListComponent
    ],
    imports: [
        ThreadRouter,
        RouterModule,
        ButtonModule,
        TagModule
    ]
})
export class ThreadModule{}