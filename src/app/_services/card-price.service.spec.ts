import { TestBed } from '@angular/core/testing';

import { CardPriceService } from './card-price.service';

describe('CardPriceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardPriceService = TestBed.get(CardPriceService);
    expect(service).toBeTruthy();
  });
});
