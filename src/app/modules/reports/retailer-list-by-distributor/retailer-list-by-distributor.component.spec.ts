import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerListByDistributorComponent } from './retailer-list-by-distributor.component';

describe('RetailerListByDistributorComponent', () => {
  let component: RetailerListByDistributorComponent;
  let fixture: ComponentFixture<RetailerListByDistributorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailerListByDistributorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerListByDistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
