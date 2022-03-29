import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadTypeUpdateComponent } from './thread-type-update.component';

describe('ThreadTypeUpdateComponent', () => {
  let component: ThreadTypeUpdateComponent;
  let fixture: ComponentFixture<ThreadTypeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadTypeUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadTypeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
