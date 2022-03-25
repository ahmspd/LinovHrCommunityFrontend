import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import {ToolbarModule} from 'primeng/toolbar';
import { IndustryListComponent } from './industry-list/industry-list.component';
import { IndustryRouter } from "./industry.router";
import { IndustryNewComponent } from './industry-new/industry-new.component';
import { IndustryUpdateComponent } from './industry-update/industry-update.component';
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
    IndustryListComponent,
    IndustryNewComponent,
    IndustryUpdateComponent
  ],
    imports: [
        IndustryRouter,
        TableModule,
        ButtonModule,
        CommonModule,
        ToolbarModule,
        FormsModule,
    ],
    providers: [],
  
})
export class IndustryModule {

}