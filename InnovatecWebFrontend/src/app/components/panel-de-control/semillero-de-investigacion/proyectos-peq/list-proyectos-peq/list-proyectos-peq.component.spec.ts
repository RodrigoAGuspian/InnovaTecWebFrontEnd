import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProyectosPeqComponent } from './list-proyectos-peq.component';

describe('ListProyectosPeqComponent', () => {
  let component: ListProyectosPeqComponent;
  let fixture: ComponentFixture<ListProyectosPeqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProyectosPeqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProyectosPeqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
