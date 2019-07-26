import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGraficasComponent } from './list-graficas.component';

describe('ListGraficasComponent', () => {
  let component: ListGraficasComponent;
  let fixture: ComponentFixture<ListGraficasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListGraficasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGraficasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
