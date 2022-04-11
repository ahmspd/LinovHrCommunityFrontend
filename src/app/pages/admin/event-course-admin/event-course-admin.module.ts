import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule } from "@angular/forms";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { InputTextModule } from "primeng/inputtext";
import { EventCourseAdminRouter } from "./event-course-admin.router";
import { EventCourseConfirmationComponent } from './event-course-confirmation/event-course-confirmation.component';
import { ImageModule } from 'primeng/image';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  declarations: [
    EventCourseConfirmationComponent
  ],
  imports: [
    EventCourseAdminRouter,
    TableModule,
    ButtonModule,
    CommonModule,
    ToolbarModule,
    FormsModule,
    ConfirmDialogModule,
    InputTextModule,
    ImageModule,
    RadioButtonModule
  ],
  providers: [],

})
export class EventCourseAdminModule {

}