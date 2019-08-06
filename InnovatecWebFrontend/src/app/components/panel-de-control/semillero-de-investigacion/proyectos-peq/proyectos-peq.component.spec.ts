import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosPeqComponent } from './proyectos-peq.component';

describe('ProyectosPeqComponent', () => {
  let component: ProyectosPeqComponent;
  let fixture: ComponentFixture<ProyectosPeqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectosPeqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosPeqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
