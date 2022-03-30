import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListUpdateComponent } from './price-list-update.component';

describe('PriceListUpdateComponent', () => {
  let component: PriceListUpdateComponent;
  let fixture: ComponentFixture<PriceListUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceListUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceListUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
