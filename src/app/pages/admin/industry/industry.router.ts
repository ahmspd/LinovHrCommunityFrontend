import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IndustryListComponent } from "./industry-list/industry-list.component";
import { IndustryNewComponent } from "./industry-new/industry-new.component";
import { IndustryUpdateComponent } from "./industry-update/industry-update.component";

const routes: Routes = [
    {
        path: 'list',
        component: IndustryListComponent
    },
    {
        path: 'new',
        component: IndustryNewComponent
    },
    {
        path: ':id',
        component: IndustryUpdateComponent
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
export class IndustryRouter {

}