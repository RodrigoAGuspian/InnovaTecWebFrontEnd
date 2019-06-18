import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenProSolarComponent } from './resumen-pro-solar.component';

describe('ResumenProSolarComponent', () => {
  let component: ResumenProSolarComponent;
  let fixture: ComponentFixture<ResumenProSolarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenProSolarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenProSolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
