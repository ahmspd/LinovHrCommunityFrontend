import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { InputTextModule } from "primeng/inputtext";
import { TableModule } from "primeng/table";
import { ToolbarModule } from "primeng/toolbar";
import { PaymentMethodListComponent } from "./payment-method-list/payment-method-list.component";
import { PaymentMethodSaveComponent } from "./payment-method-save/payment-method-save.component";
import { PaymentMethodUpdateComponent } from "./payment-method-update/payment-method-update.component";
import { PaymentMethodRouter } from "./payment-method.router";

@NgModule({
    declarations: [
        PaymentMethodSaveComponent,
        PaymentMethodListComponent,
        PaymentMethodUpdateComponent
    ],
    imports: [
        PaymentMethodRouter,
        TableModule,
        ButtonModule,
        CommonModule,
        ToolbarModule,
        FormsModule,
        ConfirmDialogModule,
        InputTextModule
    ]
})
export class PaymentMethodModule {

}