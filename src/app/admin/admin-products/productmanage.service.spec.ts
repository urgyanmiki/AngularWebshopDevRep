import { TestBed } from '@angular/core/testing';

import { ProductmanageService } from './productmanage.service';

describe('ProductmanageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductmanageService = TestBed.get(ProductmanageService);
    expect(service).toBeTruthy();
  });
});
