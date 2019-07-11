import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudNovedadesComponent } from './crud-novedades.component';

describe('CrudNovedadesComponent', () => {
  let component: CrudNovedadesComponent;
  let fixture: ComponentFixture<CrudNovedadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudNovedadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudNovedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
