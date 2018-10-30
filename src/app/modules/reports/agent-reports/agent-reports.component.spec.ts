import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentReportsComponent } from './agent-reports.component';

describe('AgentReportsComponent', () => {
  let component: AgentReportsComponent;
  let fixture: ComponentFixture<AgentReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
