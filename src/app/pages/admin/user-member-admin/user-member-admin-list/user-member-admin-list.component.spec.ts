import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMemberAdminListComponent } from './user-member-admin-list.component';

describe('UserMemberAdminListComponent', () => {
  let component: UserMemberAdminListComponent;
  let fixture: ComponentFixture<UserMemberAdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMemberAdminListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMemberAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
