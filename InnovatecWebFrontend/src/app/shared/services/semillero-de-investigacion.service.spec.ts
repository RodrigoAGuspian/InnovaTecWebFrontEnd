import { TestBed } from '@angular/core/testing';

import { SemilleroDeInvestigacionService } from './semillero-de-investigacion.service';

describe('SemilleroDeInvestigacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SemilleroDeInvestigacionService = TestBed.get(SemilleroDeInvestigacionService);
    expect(service).toBeTruthy();
  });
});
