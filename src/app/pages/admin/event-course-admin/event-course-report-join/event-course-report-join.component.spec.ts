import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCourseReportJoinComponent } from './event-course-report-join.component';

describe('EventCourseReportJoinComponent', () => {
  let component: EventCourseReportJoinComponent;
  let fixture: ComponentFixture<EventCourseReportJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventCourseReportJoinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCourseReportJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
