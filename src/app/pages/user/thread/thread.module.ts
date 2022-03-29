import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { TagModule } from "primeng/tag";
import { ThreadListComponent } from "./thread-list/thread-list.component";
import { ThreadRouter } from "./thread.router";
import { ThreadDetailComponent } from './thread-detail/thread-detail.component';
import {AvatarModule} from 'primeng/avatar';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { ThreadSaveComponent } from './thread-save/thread-save.component';

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
        TagModule,
        AvatarModule,
        InputTextareaModule
    ]
})
export class ThreadModule{}