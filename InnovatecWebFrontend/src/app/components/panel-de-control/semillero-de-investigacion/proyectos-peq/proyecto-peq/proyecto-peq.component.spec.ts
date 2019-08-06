import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoPeqComponent } from './proyecto-peq.component';

describe('ProyectoPeqComponent', () => {
  let component: ProyectoPeqComponent;
  let fixture: ComponentFixture<ProyectoPeqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectoPeqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoPeqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
