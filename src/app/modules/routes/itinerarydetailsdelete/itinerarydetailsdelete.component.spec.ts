import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItinerarydetailsdeleteComponent } from './itinerarydetailsdelete.component';

describe('ItinerarydetailsdeleteComponent', () => {
  let component: ItinerarydetailsdeleteComponent;
  let fixture: ComponentFixture<ItinerarydetailsdeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItinerarydetailsdeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItinerarydetailsdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
