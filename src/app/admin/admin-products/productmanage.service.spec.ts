import { TestBed } from '@angular/core/testing';

import { ProductmanageService } from './productmanage.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Product } from '../product-form/product.model';
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

describe('ProductmanageService', () => {
  let httpTestingController: HttpTestingController;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers:[
      ProductmanageService
    ]
  }));

  it('should get the products',()=>{
    httpTestingController = TestBed.get(HttpTestingController);
    const service: ProductmanageService = TestBed.get(ProductmanageService);
    const products: Product[] = [];
    let prodSub: Subscription;
    service.getProducts();
    prodSub=service.getProductUpdateListener().subscribe((products: Product[])=>{
      expect(products).not.toBe(null);
      expect(JSON.stringify(products)).toEqual(JSON.stringify(mockprod));
  })

    const req = httpTestingController.expectOne('http://localhost:3000/api/products')
      req.flush(mockprod);
      expect(req.request.method).toBe('GET')
      httpTestingController.verify();
  })

  it('should be created', () => {
    const service: ProductmanageService = TestBed.get(ProductmanageService);
    expect(service).toBeTruthy();
  });
});
