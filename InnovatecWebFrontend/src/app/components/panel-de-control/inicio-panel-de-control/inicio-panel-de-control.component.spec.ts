import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioPanelDeControlComponent } from './inicio-panel-de-control.component';

describe('InicioPanelDeControlComponent', () => {
  let component: InicioPanelDeControlComponent;
  let fixture: ComponentFixture<InicioPanelDeControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioPanelDeControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioPanelDeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
