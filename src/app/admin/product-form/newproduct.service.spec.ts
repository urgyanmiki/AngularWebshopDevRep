import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { NewproductService } from './newproduct.service';

describe('NewproductService', () => {

  

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      
    ],
    providers:[
      NewproductService,
      
    ],
    
  }));


 
  it('should be created', () => {
    const service: NewproductService = TestBed.get(NewproductService);
    expect(service).toBeTruthy();
  });
});
