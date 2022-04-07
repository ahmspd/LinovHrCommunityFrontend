import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileThreadBookmarkComponent } from './profile-thread-bookmark.component';

describe('ProfileThreadBookmarkComponent', () => {
  let component: ProfileThreadBookmarkComponent;
  let fixture: ComponentFixture<ProfileThreadBookmarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileThreadBookmarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileThreadBookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
