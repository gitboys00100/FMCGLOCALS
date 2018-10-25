import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerInventoryStatusComponent } from './retailer-inventory-status.component';

describe('RetailerInventoryStatusComponent', () => {
  let component: RetailerInventoryStatusComponent;
  let fixture: ComponentFixture<RetailerInventoryStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailerInventoryStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerInventoryStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
