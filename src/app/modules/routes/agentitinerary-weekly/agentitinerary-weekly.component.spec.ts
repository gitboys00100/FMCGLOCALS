import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentitineraryWeeklyComponent } from './agentitinerary-weekly.component';

describe('AgentitineraryWeeklyComponent', () => {
  let component: AgentitineraryWeeklyComponent;
  let fixture: ComponentFixture<AgentitineraryWeeklyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentitineraryWeeklyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentitineraryWeeklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
