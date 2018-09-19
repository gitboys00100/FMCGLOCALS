import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemitreceiptComponent } from './remitreceipt.component';

describe('RemitreceiptComponent', () => {
  let component: RemitreceiptComponent;
  let fixture: ComponentFixture<RemitreceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemitreceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemitreceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
