import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRetailerComponent } from './new-retailer.component';

describe('NewRetailerComponent', () => {
  let component: NewRetailerComponent;
  let fixture: ComponentFixture<NewRetailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRetailerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRetailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
