import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCourseCartComponent } from './event-course-cart.component';

describe('EventCourseCartComponent', () => {
  let component: EventCourseCartComponent;
  let fixture: ComponentFixture<EventCourseCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventCourseCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCourseCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
