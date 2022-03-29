import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadSaveComponent } from './thread-save.component';

describe('ThreadSaveComponent', () => {
  let component: ThreadSaveComponent;
  let fixture: ComponentFixture<ThreadSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
