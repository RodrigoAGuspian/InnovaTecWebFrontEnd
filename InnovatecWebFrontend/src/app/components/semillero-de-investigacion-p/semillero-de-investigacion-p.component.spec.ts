import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemilleroDeInvestigacionPComponent } from './semillero-de-investigacion-p.component';

describe('SemilleroDeInvestigacionPComponent', () => {
  let component: SemilleroDeInvestigacionPComponent;
  let fixture: ComponentFixture<SemilleroDeInvestigacionPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemilleroDeInvestigacionPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemilleroDeInvestigacionPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
