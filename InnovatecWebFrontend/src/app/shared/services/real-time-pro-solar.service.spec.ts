import { TestBed } from '@angular/core/testing';

import { RealTimeProSolarService } from './real-time-pro-solar.service';

describe('RealTimeProSolarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RealTimeProSolarService = TestBed.get(RealTimeProSolarService);
    expect(service).toBeTruthy();
  });
});
