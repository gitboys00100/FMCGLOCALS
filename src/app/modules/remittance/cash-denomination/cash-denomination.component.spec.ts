import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashDenominationComponent } from './cash-denomination.component';

describe('CashDenominationComponent', () => {
  let component: CashDenominationComponent;
  let fixture: ComponentFixture<CashDenominationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashDenominationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashDenominationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
