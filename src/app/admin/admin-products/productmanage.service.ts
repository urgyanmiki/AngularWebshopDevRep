import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from "src/app/admin/product-form/product.model";
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductmanageService {

  constructor(private http: HttpClient) { }

  private products: Product[] = [];
  private productsUpdated = new Subject<Product[]>();  
  
  

  

  getProducts() {
    console.log('it wass called');
    this.http
      .get<{ message: string; product: any }>("http://localhost:3000/api/products")
      .pipe(map((productData) => {
        console.log(productData)
        return productData.product.map(product => {
          return {
            id: product._id,  
            name: product.name,
            gender: product.gender,
            type: product.type,
            imageurl: product.imageurl,
            price: product.price,
            quantity: product.quantity,
            description: product.description,
            
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
    deleteProduct(id: string){
      this.http.delete("http://localhost:3000/api/products/delete" + id).subscribe(()=>{
      const updatedProduct = this.products.filter(product=> product.id!==id);
      this.products=updatedProduct;
      this.productsUpdated.next([...this.products]);
      })
    }
    findOne(id){
      console.log(id)
      this.http.get<{message: string, product: any}>("http://localhost:3000/api/products/find/"+ id)
      .pipe(map((productData) => {
        console.log(productData)
        return productData.product.map(product => {
          return {
            id: product._id,  
            name: product.name,
            gender: product.gender,
            type: product.type,
            imageurl: product.imageurl,
            price: product.price,
            quantity: product.quantity,
            description: product.description,
          };
          
        });
        
      }))
    }
}
