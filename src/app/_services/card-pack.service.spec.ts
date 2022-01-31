import { TestBed } from '@angular/core/testing';

import { CardPackService } from './card-pack.service';

describe('CardPackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardPackService = TestBed.get(CardPackService);
    expect(service).toBeTruthy();
  });
});
