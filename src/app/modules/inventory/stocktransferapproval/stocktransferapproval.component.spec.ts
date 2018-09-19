import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocktransferapprovalComponent } from './stocktransferapproval.component';

describe('StocktransferapprovalComponent', () => {
  let component: StocktransferapprovalComponent;
  let fixture: ComponentFixture<StocktransferapprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocktransferapprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocktransferapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
