import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmapprovalComponent } from './confirmapproval.component';

describe('ConfirmapprovalComponent', () => {
  let component: ConfirmapprovalComponent;
  let fixture: ComponentFixture<ConfirmapprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmapprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
