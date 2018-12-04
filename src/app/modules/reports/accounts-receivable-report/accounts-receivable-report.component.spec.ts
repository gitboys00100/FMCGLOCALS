import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsReceivableReportComponent } from './accounts-receivable-report.component';

describe('AccountsReceivableReportComponent', () => {
  let component: AccountsReceivableReportComponent;
  let fixture: ComponentFixture<AccountsReceivableReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsReceivableReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsReceivableReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
