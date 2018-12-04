import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreModalComponent } from './core-modal.component';

describe('CoreModalComponent', () => {
  let component: CoreModalComponent;
  let fixture: ComponentFixture<CoreModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoreModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
