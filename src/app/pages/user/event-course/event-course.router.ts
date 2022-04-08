import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EventCourseCartComponent } from "./event-course-cart/event-course-cart.component";
import { EventCourseCreatedListComponent } from "./event-course-created-list/event-course-created-list.component";
import { EventCourseDetailComponent } from "./event-course-detail/event-course-detail.component";
import { EventCourseJoinComponent } from "./event-course-join/event-course-join.component";
import { EventCourseListComponent } from "./event-course-list/event-course-list.component";
import { EventCourseOrderListComponent } from "./event-course-order-list/event-course-order-list.component";
import { EventCourseSaveComponent } from "./event-course-save/event-course-save.component";

const routes: Routes = [
    {
        path: 'list',
        component: EventCourseListComponent
    },
    {
        path: 'save',
        component: EventCourseSaveComponent
    },
    {
        path: 'detail',
        component: EventCourseDetailComponent
    },
    {
        path: 'join/:id',
        component: EventCourseJoinComponent
    },
    {
        path: 'order-list/:id',
        component: EventCourseOrderListComponent
    },
    {
        path: 'created',
        component: EventCourseCreatedListComponent
    },
    {
        path: 'cart',
        component: EventCourseCartComponent
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
export class EventCourseRouter{}