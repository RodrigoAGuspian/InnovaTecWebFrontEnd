import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogForImgsComponent } from './dialog-for-imgs.component';

describe('DialogForImgsComponent', () => {
  let component: DialogForImgsComponent;
  let fixture: ComponentFixture<DialogForImgsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogForImgsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogForImgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
