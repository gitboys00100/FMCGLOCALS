import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignitineraryComponent } from './assignitinerary.component';

describe('AssignitineraryComponent', () => {
  let component: AssignitineraryComponent;
  let fixture: ComponentFixture<AssignitineraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignitineraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignitineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
