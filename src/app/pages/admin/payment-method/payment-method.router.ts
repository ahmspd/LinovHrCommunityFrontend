import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PaymentMethodListComponent } from "./payment-method-list/payment-method-list.component";
import { PaymentMethodSaveComponent } from "./payment-method-save/payment-method-save.component";
import { PaymentMethodUpdateComponent } from "./payment-method-update/payment-method-update.component";

const routes: Routes =[
    {
        path : 'list',
        component : PaymentMethodListComponent
    },
    {
        path : 'new',
        component : PaymentMethodSaveComponent
    },
    {
        path : ':id',
        component : PaymentMethodUpdateComponent
    }
]
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports : [
        RouterModule
    ]
})
export class PaymentMethodRouter {

}