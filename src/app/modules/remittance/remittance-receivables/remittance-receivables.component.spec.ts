import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemittanceReceivablesComponent } from './remittance-receivables.component';

describe('RemittanceReceivablesComponent', () => {
  let component: RemittanceReceivablesComponent;
  let fixture: ComponentFixture<RemittanceReceivablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemittanceReceivablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemittanceReceivablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
