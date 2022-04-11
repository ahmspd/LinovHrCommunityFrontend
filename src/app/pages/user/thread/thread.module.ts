import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { TagModule } from "primeng/tag";
import { ThreadListComponent } from "./thread-list/thread-list.component";
import { ThreadRouter } from "./thread.router";
import { ThreadDetailComponent } from './thread-detail/thread-detail.component';
import { AvatarModule } from 'primeng/avatar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ThreadSaveComponent } from './thread-save/thread-save.component';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MultiSelectModule } from "primeng/multiselect";
import { ProgressBarModule } from "primeng/progressbar";
import { TableModule } from "primeng/table";
import { ImageModule } from "primeng/image";

@NgModule({
    declarations: [
        ThreadListComponent,
        ThreadDetailComponent,
        ThreadSaveComponent
    ],
    imports: [
        ThreadRouter,
        RouterModule,
        ButtonModule,
        TableModule,
        TagModule,
        AvatarModule,
        InputTextareaModule,
        InputTextModule,
        DropdownModule,
        CKEditorModule,
        FormsModule,
        CommonModule,
        InputSwitchModule,
        MultiSelectModule,
        ProgressBarModule,
        ImageModule
    ]
})
export class ThreadModule { }