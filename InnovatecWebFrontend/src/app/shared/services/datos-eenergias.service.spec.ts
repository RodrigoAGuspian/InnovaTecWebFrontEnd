import { TestBed } from '@angular/core/testing';

import { DatosEenergiasService } from './datos-eenergias.service';

describe('DatosEenergiasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatosEenergiasService = TestBed.get(DatosEenergiasService);
    expect(service).toBeTruthy();
  });
});
