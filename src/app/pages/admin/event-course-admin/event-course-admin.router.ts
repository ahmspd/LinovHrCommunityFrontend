import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EventCourseConfirmationComponent } from "./event-course-confirmation/event-course-confirmation.component";

const routes: Routes = [
    {
        path: 'confirmation',
        component: EventCourseConfirmationComponent
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
export class EventCourseAdminRouter {

}