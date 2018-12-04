import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewitineraryComponent } from './newitinerary.component';

describe('NewitineraryComponent', () => {
  let component: NewitineraryComponent;
  let fixture: ComponentFixture<NewitineraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewitineraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewitineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
