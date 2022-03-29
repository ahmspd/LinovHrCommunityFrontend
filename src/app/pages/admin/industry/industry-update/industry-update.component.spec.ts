import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryUpdateComponent } from './industry-update.component';

describe('IndustryUpdateComponent', () => {
  let component: IndustryUpdateComponent;
  let fixture: ComponentFixture<IndustryUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustryUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
