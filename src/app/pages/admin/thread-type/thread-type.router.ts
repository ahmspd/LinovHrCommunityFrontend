import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ThreadTypeListComponent } from "./thread-type-list/thread-type-list.component";
import { ThreadTypeNewComponent } from "./thread-type-new/thread-type-new.component";
import { ThreadTypeUpdateComponent } from "./thread-type-update/thread-type-update.component";
const routes: Routes =[
    {
        path:'list',
        component: ThreadTypeListComponent
    },
    {
        path:'new',
        component: ThreadTypeNewComponent
    },
    {
        path:':id',
        component: ThreadTypeUpdateComponent
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
export class ThreadTypeRouter{}