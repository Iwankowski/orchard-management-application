import { TestBed } from '@angular/core/testing';

import { PlantationService } from './plantation.service';

describe('PlantationService', () => {
  let service: PlantationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
