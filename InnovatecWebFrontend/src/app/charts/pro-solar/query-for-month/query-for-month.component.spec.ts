import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryForMonthComponent } from './query-for-month.component';

describe('QueryForMonthComponent', () => {
  let component: QueryForMonthComponent;
  let fixture: ComponentFixture<QueryForMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryForMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryForMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
