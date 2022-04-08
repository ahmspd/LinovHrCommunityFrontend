import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCourseOrderListComponent } from './event-course-order-list.component';

describe('EventCourseOrderListComponent', () => {
  let component: EventCourseOrderListComponent;
  let fixture: ComponentFixture<EventCourseOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventCourseOrderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCourseOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
