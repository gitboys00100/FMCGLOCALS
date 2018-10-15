import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentitineraryComponent } from './agentitinerary.component';

describe('AgentitineraryComponent', () => {
  let component: AgentitineraryComponent;
  let fixture: ComponentFixture<AgentitineraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentitineraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentitineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
