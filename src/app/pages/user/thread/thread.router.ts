import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ThreadDetailComponent } from "./thread-detail/thread-detail.component";
import { ThreadListComponent } from "./thread-list/thread-list.component";
import { ThreadSaveComponent } from "./thread-save/thread-save.component";

const routes: Routes = [
    {
        path: 'list',
        component: ThreadListComponent
    },
    {
        path: 'save',
        component: ThreadSaveComponent
    },
    {
        path: 'detail',
        component: ThreadDetailComponent
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