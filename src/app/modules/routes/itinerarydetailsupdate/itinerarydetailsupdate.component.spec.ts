import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItinerarydetailsupdateComponent } from './itinerarydetailsupdate.component';

describe('ItinerarydetailsupdateComponent', () => {
  let component: ItinerarydetailsupdateComponent;
  let fixture: ComponentFixture<ItinerarydetailsupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItinerarydetailsupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItinerarydetailsupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
