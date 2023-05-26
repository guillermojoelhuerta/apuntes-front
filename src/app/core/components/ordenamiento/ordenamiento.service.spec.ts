import { TestBed } from '@angular/core/testing';

import { OrdenamientoService } from './ordenamiento.service';

describe('OrdenamientoService', () => {
  let service: OrdenamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdenamientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
