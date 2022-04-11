import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEventCourseComponent } from './profile-event-course.component';

describe('ProfileEventCourseComponent', () => {
  let component: ProfileEventCourseComponent;
  let fixture: ComponentFixture<ProfileEventCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEventCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEventCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
