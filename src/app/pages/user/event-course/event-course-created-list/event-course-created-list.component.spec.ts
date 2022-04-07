import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCourseCreatedListComponent } from './event-course-created-list.component';

describe('EventCourseCreatedListComponent', () => {
  let component: EventCourseCreatedListComponent;
  let fixture: ComponentFixture<EventCourseCreatedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventCourseCreatedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCourseCreatedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
