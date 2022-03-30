import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadTypeListComponent } from './thread-type-list.component';

describe('ThreadTypeListComponent', () => {
  let component: ThreadTypeListComponent;
  let fixture: ComponentFixture<ThreadTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadTypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
