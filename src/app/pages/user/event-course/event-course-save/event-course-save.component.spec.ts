import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCourseSaveComponent } from './event-course-save.component';

describe('EventCourseSaveComponent', () => {
  let component: EventCourseSaveComponent;
  let fixture: ComponentFixture<EventCourseSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventCourseSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCourseSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
