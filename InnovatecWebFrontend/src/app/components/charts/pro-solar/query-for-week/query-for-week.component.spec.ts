import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryForWeekComponent } from './query-for-week.component';

describe('QueryForWeekComponent', () => {
  let component: QueryForWeekComponent;
  let fixture: ComponentFixture<QueryForWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryForWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryForWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
