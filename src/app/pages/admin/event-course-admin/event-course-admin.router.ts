import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EventCourseConfirmationComponent } from "./event-course-confirmation/event-course-confirmation.component";
import { EventCourseReportJoinComponent } from "./event-course-report-join/event-course-report-join.component";
import { EventCourseReportPaymentComponent } from "./event-course-report-payment/event-course-report-payment.component";

const routes: Routes = [
    {
        path: 'confirmation',
        component: EventCourseConfirmationComponent
    },
    {
        path: 'report/join',
        component: EventCourseReportJoinComponent
    },
    {
        path: 'report/payment',
        component: EventCourseReportPaymentComponent
    }
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