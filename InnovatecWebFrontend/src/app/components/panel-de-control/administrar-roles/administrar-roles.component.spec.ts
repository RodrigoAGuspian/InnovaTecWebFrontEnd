import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarRolesComponent } from './administrar-roles.component';

describe('AdministrarRolesComponent', () => {
  let component: AdministrarRolesComponent;
  let fixture: ComponentFixture<AdministrarRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
