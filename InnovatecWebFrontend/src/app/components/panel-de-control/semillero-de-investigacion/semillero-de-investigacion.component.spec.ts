import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemilleroDeInvestigacionComponent } from './semillero-de-investigacion.component';

describe('SemilleroDeInvestigacionComponent', () => {
  let component: SemilleroDeInvestigacionComponent;
  let fixture: ComponentFixture<SemilleroDeInvestigacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemilleroDeInvestigacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemilleroDeInvestigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
