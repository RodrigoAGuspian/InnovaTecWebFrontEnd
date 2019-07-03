import { TestBed } from '@angular/core/testing';

import { InformacionArticulosService } from './informacion-articulos.service';

describe('InformacionArticulosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InformacionArticulosService = TestBed.get(InformacionArticulosService);
    expect(service).toBeTruthy();
  });
});
