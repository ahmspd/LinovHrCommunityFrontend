import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCourseConfirmationComponent } from './event-course-confirmation.component';

describe('EventCourseConfirmationComponent', () => {
  let component: EventCourseConfirmationComponent;
  let fixture: ComponentFixture<EventCourseConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventCourseConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCourseConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
