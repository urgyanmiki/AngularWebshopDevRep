import { Injectable } from '@angular/core';
import { Product } from "src/app/admin/product-form/product.model";
import { Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

import { NgbPaginationNext } from '@ng-bootstrap/ng-bootstrap';



@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  private products: Product[] = [];
  private productsUpdated = new Subject<Product[]>();   

  getProducts() {
    console.log('it wass called');
    this.http
      .get<{ message: string; product: any }>("http://localhost:3000/api/products")
      .pipe(map((productData) => {
        return productData.product.map(product => {
          return {
            name: product.name,
            gender: product.gender,
            type: product.type,
            imageurl: product.imageurl,
            price: product.price,
            quantity: product.quantity,
            description: product.description,
            _id: product.id,  
          };
          
        });
        
      }))
      .subscribe(transformedProducts => {
        this.products = transformedProducts;
        this.productsUpdated.next([...this.products]);
      });      
    }

    filtering(type){
    this.http.get<{ message: string; product: any }>("http://localhost:3000/api/products/type"+type)
      .pipe(map((productData) => {
        return productData.product.map(product => {
          return {
            name: product.name,
            gender: product.gender,
            type: product.type,
            imageurl: product.imageurl,
            price: product.price,
            quantity: product.quantity,
            description: product.description,
            _id: product.id,  
          };
          
        });
        
      }))
      .subscribe(transformedProducts => {
        this.products = transformedProducts;
        this.productsUpdated.next([...this.products]);
      });
    }

    getProductUpdateListener(){
      return this.productsUpdated.asObservable();
    }

}

