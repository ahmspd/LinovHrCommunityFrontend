import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionNewComponent } from './position-new.component';

describe('PositionNewComponent', () => {
  let component: PositionNewComponent;
  let fixture: ComponentFixture<PositionNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
