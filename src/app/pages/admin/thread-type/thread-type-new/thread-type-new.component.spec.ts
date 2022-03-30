import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadTypeNewComponent } from './thread-type-new.component';

describe('ThreadTypeNewComponent', () => {
  let component: ThreadTypeNewComponent;
  let fixture: ComponentFixture<ThreadTypeNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadTypeNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadTypeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
