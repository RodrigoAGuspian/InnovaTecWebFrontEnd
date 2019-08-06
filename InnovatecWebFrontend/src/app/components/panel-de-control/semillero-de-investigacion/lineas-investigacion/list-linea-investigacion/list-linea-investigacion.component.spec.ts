import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLineaInvestigacionComponent } from './list-linea-investigacion.component';

describe('ListLineaInvestigacionComponent', () => {
  let component: ListLineaInvestigacionComponent;
  let fixture: ComponentFixture<ListLineaInvestigacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLineaInvestigacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLineaInvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
