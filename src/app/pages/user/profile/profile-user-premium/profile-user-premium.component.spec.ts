import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserPremiumComponent } from './profile-user-premium.component';

describe('ProfileUserPremiumComponent', () => {
  let component: ProfileUserPremiumComponent;
  let fixture: ComponentFixture<ProfileUserPremiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileUserPremiumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUserPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
