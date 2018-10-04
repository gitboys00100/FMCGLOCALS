import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItinerarydetailsComponent } from './itinerarydetails.component';

describe('ItinerarydetailsComponent', () => {
  let component: ItinerarydetailsComponent;
  let fixture: ComponentFixture<ItinerarydetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItinerarydetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItinerarydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
