import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PriceListListComponent } from "./price-list-list/price-list-list.component";
import { PriceListNewComponent } from "./price-list-new/price-list-new.component";
import { PriceListUpdateComponent } from "./price-list-update/price-list-update.component";
const routes : Routes = [
    {
        path : 'list',
        component : PriceListListComponent
    },
    {
        path: 'new',
        component : PriceListNewComponent
    },
    {
        path: ':id',
        component : PriceListUpdateComponent
    }
]
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class PriceListRouter {}