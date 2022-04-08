import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCourseListComponent } from './event-course-list.component';

describe('EventCourseListComponent', () => {
  let component: EventCourseListComponent;
  let fixture: ComponentFixture<EventCourseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventCourseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
