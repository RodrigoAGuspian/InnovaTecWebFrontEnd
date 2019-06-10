import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenEenergiasTarjeta1Component } from './resumen-eenergias-tarjeta1.component';

describe('ResumenEenergiasTarjeta1Component', () => {
  let component: ResumenEenergiasTarjeta1Component;
  let fixture: ComponentFixture<ResumenEenergiasTarjeta1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenEenergiasTarjeta1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenEenergiasTarjeta1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
