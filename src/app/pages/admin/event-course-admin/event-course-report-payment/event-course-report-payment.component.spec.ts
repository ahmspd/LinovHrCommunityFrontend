import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCourseReportPaymentComponent } from './event-course-report-payment.component';

describe('EventCourseReportPaymentComponent', () => {
  let component: EventCourseReportPaymentComponent;
  let fixture: ComponentFixture<EventCourseReportPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventCourseReportPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCourseReportPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
