import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutescheddailyComponent } from './routescheddaily.component';

describe('RoutescheddailyComponent', () => {
  let component: RoutescheddailyComponent;
  let fixture: ComponentFixture<RoutescheddailyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutescheddailyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutescheddailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
