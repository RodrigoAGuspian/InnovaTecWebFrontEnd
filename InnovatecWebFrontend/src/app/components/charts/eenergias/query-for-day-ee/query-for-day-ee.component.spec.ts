import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryForDayEeComponent } from './query-for-day-ee.component';

describe('QueryForDayEeComponent', () => {
  let component: QueryForDayEeComponent;
  let fixture: ComponentFixture<QueryForDayEeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryForDayEeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryForDayEeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
