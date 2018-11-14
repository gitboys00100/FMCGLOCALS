import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteschedmonthlyComponent } from './routeschedmonthly.component';

describe('RouteschedmonthlyComponent', () => {
  let component: RouteschedmonthlyComponent;
  let fixture: ComponentFixture<RouteschedmonthlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteschedmonthlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteschedmonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
