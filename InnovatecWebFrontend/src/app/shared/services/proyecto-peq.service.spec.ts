import { TestBed } from '@angular/core/testing';

import { ProyectoPeqService } from './proyecto-peq.service';

describe('ProyectoPeqService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProyectoPeqService = TestBed.get(ProyectoPeqService);
    expect(service).toBeTruthy();
  });
});
