import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PositionListComponent } from "./position-list/position-list.component";
import { PositionNewComponent } from "./position-new/position-new.component";
import { PositionUpdateComponent } from "./position-update/position-update.component";

const routes: Routes = [
    {
        path: 'list',
        component: PositionListComponent
    },
    {
        path: 'new',
        component: PositionNewComponent
    },
    {
        path: ':id',
        component: PositionUpdateComponent
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
export class PositionRouter {

}