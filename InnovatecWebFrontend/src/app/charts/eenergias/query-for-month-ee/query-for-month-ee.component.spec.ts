import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryForMonthEeComponent } from './query-for-month-ee.component';

describe('QueryForMonthEeComponent', () => {
  let component: QueryForMonthEeComponent;
  let fixture: ComponentFixture<QueryForMonthEeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryForMonthEeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryForMonthEeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
