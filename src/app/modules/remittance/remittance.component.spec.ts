import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemittanceComponent } from './remittance.component';

describe('RemittanceComponent', () => {
  let component: RemittanceComponent;
  let fixture: ComponentFixture<RemittanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemittanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemittanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
