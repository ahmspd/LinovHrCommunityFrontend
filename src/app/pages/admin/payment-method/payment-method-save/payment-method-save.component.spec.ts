import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodSaveComponent } from './payment-method-save.component';

describe('PaymentMethodSaveComponent', () => {
  let component: PaymentMethodSaveComponent;
  let fixture: ComponentFixture<PaymentMethodSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentMethodSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMethodSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
