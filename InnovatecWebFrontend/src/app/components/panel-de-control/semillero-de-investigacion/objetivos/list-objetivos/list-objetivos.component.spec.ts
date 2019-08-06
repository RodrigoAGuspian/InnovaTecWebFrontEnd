import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListObjetivosComponent } from './list-objetivos.component';

describe('ListObjetivosComponent', () => {
  let component: ListObjetivosComponent;
  let fixture: ComponentFixture<ListObjetivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListObjetivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListObjetivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
