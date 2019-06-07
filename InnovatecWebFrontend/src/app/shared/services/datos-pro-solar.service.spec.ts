import { TestBed } from '@angular/core/testing';

import { DatosProSolarService } from './datos-pro-solar.service';

describe('DatosProSolarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatosProSolarService = TestBed.get(DatosProSolarService);
    expect(service).toBeTruthy();
  });
});
