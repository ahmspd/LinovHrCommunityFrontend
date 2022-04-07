import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { TagModule } from "primeng/tag";
import { EventCourseListComponent } from "./event-course-list/event-course-list.component";
import { EventCourseRouter } from "./event-course.router";
import { AvatarModule } from 'primeng/avatar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { InputSwitchModule } from 'primeng/inputswitch';
import { EventCourseSaveComponent } from './event-course-save/event-course-save.component';
import { EventCourseDetailComponent } from './event-course-detail/event-course-detail.component';
import { TabViewModule } from "primeng/tabview";
import { DataViewModule } from "primeng/dataview";
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { EventCourseJoinComponent } from './event-course-join/event-course-join.component';
import { EventCourseOrderListComponent } from './event-course-order-list/event-course-order-list.component';
import { EventCourseCreatedListComponent } from './event-course-created-list/event-course-created-list.component';
import { ImageModule } from 'primeng/image';
import { EventCourseCartComponent } from './event-course-cart/event-course-cart.component';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
    declarations: [
        EventCourseListComponent,
        EventCourseSaveComponent,
        EventCourseDetailComponent,
        EventCourseJoinComponent,
        EventCourseOrderListComponent,
        EventCourseCreatedListComponent,
        EventCourseCartComponent
    ],
    imports: [
        EventCourseRouter,
        RouterModule,
        ButtonModule,
        TagModule,
        AvatarModule,
        InputTextareaModule,
        InputTextModule,
        DropdownModule,
        FormsModule,
        CommonModule,
        InputSwitchModule,
        TabViewModule,
        DataViewModule,
        MultiSelectModule,
        SelectButtonModule,
        InputNumberModule,
        CalendarModule,
        FileUploadModule,
        HttpClientModule,
        ConfirmDialogModule,
        ImageModule,
        CheckboxModule
    ]
})
export class EventCourseModule { }