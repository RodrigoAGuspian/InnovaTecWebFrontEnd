import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeProyectosComponent } from './lista-de-proyectos.component';

describe('ListaDeProyectosComponent', () => {
  let component: ListaDeProyectosComponent;
  let fixture: ComponentFixture<ListaDeProyectosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDeProyectosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDeProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
