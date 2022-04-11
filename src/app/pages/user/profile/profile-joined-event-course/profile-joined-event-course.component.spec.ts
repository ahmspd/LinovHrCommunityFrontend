import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileJoinedEventCourseComponent } from './profile-joined-event-course.component';

describe('ProfileJoinedEventCourseComponent', () => {
  let component: ProfileJoinedEventCourseComponent;
  let fixture: ComponentFixture<ProfileJoinedEventCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileJoinedEventCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileJoinedEventCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
