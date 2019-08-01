import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsayoCloudMesseComponent } from './ensayo-cloud-messe.component';

describe('EnsayoCloudMesseComponent', () => {
  let component: EnsayoCloudMesseComponent;
  let fixture: ComponentFixture<EnsayoCloudMesseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnsayoCloudMesseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnsayoCloudMesseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
