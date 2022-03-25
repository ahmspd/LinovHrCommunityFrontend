import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ThreadListComponent } from "./thread-list/thread-list.component";

const routes: Routes = [
    {
        path: 'list',
        component: ThreadListComponent
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
export class ThreadRouter{}