import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaInvestigacionComponent } from './linea-investigacion.component';

describe('LineaInvestigacionComponent', () => {
  let component: LineaInvestigacionComponent;
  let fixture: ComponentFixture<LineaInvestigacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineaInvestigacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineaInvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
