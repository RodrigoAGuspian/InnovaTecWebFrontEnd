import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimeEenergiasComponent } from './real-time-eenergias.component';

describe('RealTimeEenergiasComponent', () => {
  let component: RealTimeEenergiasComponent;
  let fixture: ComponentFixture<RealTimeEenergiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealTimeEenergiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealTimeEenergiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
