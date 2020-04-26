import { TestBed } from '@angular/core/testing';

import { NewproductService } from './newproduct.service';

describe('NewproductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewproductService = TestBed.get(NewproductService);
    expect(service).toBeTruthy();
  });
});
