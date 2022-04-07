import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCourseJoinComponent } from './event-course-join.component';

describe('EventCourseJoinComponent', () => {
  let component: EventCourseJoinComponent;
  let fixture: ComponentFixture<EventCourseJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventCourseJoinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCourseJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
