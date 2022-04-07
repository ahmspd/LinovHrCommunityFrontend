import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileThreadLikeComponent } from './profile-thread-like.component';

describe('ProfileThreadLikeComponent', () => {
  let component: ProfileThreadLikeComponent;
  let fixture: ComponentFixture<ProfileThreadLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileThreadLikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileThreadLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
