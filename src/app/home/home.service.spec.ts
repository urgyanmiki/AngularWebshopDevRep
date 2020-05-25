import { TestBed } from '@angular/core/testing';

import { HomeService } from './home.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideRoutes, Routes } from '@angular/router';
import { Product } from '../admin/product-form/product.model';
import { Subscription } from 'rxjs';

export const mockprod: Product={
  id:'testid1',
  name: 'Nice shoe',
  gender: 'man',
  type: 'Shoe',
  imageurl:'fakeimage',
  price: 12,
  quantity: 20,
  description:'must by it'
}

describe('HomeService', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({


    imports: [
      HttpClientTestingModule,
      RouterTestingModule
    ],
    providers:[
      HomeService,
      
    ]
  }));

  it('should return the product',()=>{
    httpTestingController = TestBed.get(HttpTestingController);
    const service: HomeService = TestBed.get(HomeService);
    const products: Product[] = [];
    let prodSub: Subscription;
    service.getProducts();
    prodSub=service.getProductUpdateListener().subscribe((products: Product[])=>{
      expect(products).not.toBe(null);
      expect(JSON.stringify(products)).toEqual(JSON.stringify(mockprod));
  })

    const req = httpTestingController.expectOne('http://localhost:3000/api/products')
      req.flush(mockprod);

  })
  it('should be created', () => {
    const service: HomeService = TestBed.get(HomeService);
    expect(service).toBeTruthy();
  });
});
