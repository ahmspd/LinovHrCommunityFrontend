import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryNewComponent } from './industry-new.component';

describe('IndustryNewComponent', () => {
  let component: IndustryNewComponent;
  let fixture: ComponentFixture<IndustryNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustryNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustryNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
