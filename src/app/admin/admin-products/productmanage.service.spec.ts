import { TestBed } from '@angular/core/testing';

import { ProductmanageService } from './productmanage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductmanageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers:[
      ProductmanageService
    ]
  }));

  it('should be created', () => {
    const service: ProductmanageService = TestBed.get(ProductmanageService);
    expect(service).toBeTruthy();
  });
});
