import { TestBed } from '@angular/core/testing';

import { RealTimeEenergiasService } from './real-time-eenergias.service';

describe('RealTimeEenergiasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RealTimeEenergiasService = TestBed.get(RealTimeEenergiasService);
    expect(service).toBeTruthy();
  });
});
