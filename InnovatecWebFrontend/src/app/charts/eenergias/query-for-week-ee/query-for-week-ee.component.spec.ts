import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryForWeekEeComponent } from './query-for-week-ee.component';

describe('QueryForWeekEeComponent', () => {
  let component: QueryForWeekEeComponent;
  let fixture: ComponentFixture<QueryForWeekEeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryForWeekEeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryForWeekEeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
