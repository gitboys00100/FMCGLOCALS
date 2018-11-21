import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteschedweeklyComponent } from './routeschedweekly.component';

describe('RouteschedweeklyComponent', () => {
  let component: RouteschedweeklyComponent;
  let fixture: ComponentFixture<RouteschedweeklyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteschedweeklyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteschedweeklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
