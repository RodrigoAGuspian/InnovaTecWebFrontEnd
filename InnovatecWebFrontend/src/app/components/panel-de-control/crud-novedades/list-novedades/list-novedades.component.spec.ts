import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNovedadesComponent } from './list-novedades.component';

describe('ListNovedadesComponent', () => {
  let component: ListNovedadesComponent;
  let fixture: ComponentFixture<ListNovedadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListNovedadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNovedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
