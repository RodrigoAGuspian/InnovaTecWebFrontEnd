import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryForDayProSolarComponent } from './query-for-day-pro-solar.component';

describe('QueryForDayProSolarComponent', () => {
  let component: QueryForDayProSolarComponent;
  let fixture: ComponentFixture<QueryForDayProSolarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryForDayProSolarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryForDayProSolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
