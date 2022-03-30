import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PriceTypeListComponent } from "./price-type-list/price-type-list.component";
import { PriceTypeNewComponent } from "./price-type-new/price-type-new.component";
import { PriceTypeUpdateComponent } from "./price-type-update/price-type-update.component";

const routes: Routes = [
    {
        path: 'list',
        component: PriceTypeListComponent
    },
    {
        path: 'new',
        component: PriceTypeNewComponent
    },
    {
        path: ':id',
        component: PriceTypeUpdateComponent
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class PriceTypeRouter {

}