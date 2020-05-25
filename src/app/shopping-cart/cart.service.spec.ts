import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from './cart.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { parse } from 'querystring';
import { Order } from '../models/order.model';
import { Subscription } from 'rxjs';

export const getmockOrder: Order ={
    orderid: '5oid',
    userid: '5uid',
    products: 'Skirt,Shoe',
    finalamount: 45,
    username: 'bill'
}
export const postmockOrder: Order = null;

describe('CartService', () => {
  let httpTestingController: HttpTestingController;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule,
      
    ],
    providers:[
      
      LoginService
    ],
  }));
  //Testing finalamount management

  it('should save the finalamount',()=>{
    const price=12;
    const service: CartService = TestBed.get(CartService);
    service.setFinalAmount(price);
    expect(localStorage.getItem('finalamount')).toBe(price.toString());
    localStorage.removeItem('finalamount')
  })

  it('should get the finalamount',()=>{
    const price=12;
    const service: CartService = TestBed.get(CartService);
    localStorage.setItem('finalamount',price.toString())
    
    expect(service.getFinalprice()).toBe(price);

    localStorage.removeItem('finalamount')
  })

  it('should modify the finalamount',()=>{
    let price1=12;
    let price2=14;
    const service: CartService = TestBed.get(CartService);
    localStorage.setItem('finalamount',price1.toString())
    service.modifyFinalAmount(price2);

    price2=price2+price1;
    expect(localStorage.getItem('finalamount')).toBe(price2.toString());
    localStorage.removeItem('finalamount')

  })

  it('should delete the final amount',()=>{
    const price=12;
    const service: CartService = TestBed.get(CartService);
    localStorage.setItem('finalamount',price.toString())
    service.deleteFinalAmount();
    expect(localStorage.getItem('finalamount')).toBeNull;
    localStorage.removeItem('finalamount')
  })

  //Testing product name management

  it('should save the products',()=>{
    const productname='Skirt';
    const service: CartService = TestBed.get(CartService);
    service.setProductName(productname);

    expect(localStorage.getItem("Productnames")).toBe(productname);
    localStorage.removeItem('Productnames')
  })
  it('should retrieve the product name',()=>{
    const productname='Skirt';
    localStorage.setItem('Productnames',productname);
    const service: CartService = TestBed.get(CartService);

    expect(service.getProductName()).toBe(productname);
    localStorage.removeItem('Productnames')
  })
  it('should modify the productnames',()=>{
    const productname1='Skirt';
    let productname2='Shoe';
    const service: CartService = TestBed.get(CartService);

    localStorage.setItem('Productnames',productname1);
    service.modifyProductName(productname2);
    productname2=productname1 + ', ' + productname2;

    expect(localStorage.getItem('Productnames')).toBe(productname2)
    localStorage.removeItem('Productnames')
  })

  it('should delete productnames',()=>{
    const productname='Skirt';
    localStorage.setItem('Productnames',productname);
    const service: CartService = TestBed.get(CartService);

    service.deleteProductName();

    expect(localStorage.getItem('Productnames')).toBe(null);
    localStorage.removeItem('Productnames')
  })
  //Testing add to cart
  it('should add product to cart when there is no products',()=>{
    const productname='Skirt';
    const price=12;

    const service: CartService = TestBed.get(CartService);

    service.AddingtoCart(productname,price);

    expect(localStorage.getItem('Productnames')).toBe(productname);
    localStorage.removeItem('Productnames')
    localStorage.removeItem('finalamount')
  })

  it('should add price to cart when there is no price',()=>{
    localStorage.removeItem('finalamount')
    const productname='Skirt';
    let price='12';

    const service: CartService = TestBed.get(CartService);

    service.AddingtoCart(productname,parseInt(price));
    
    expect(localStorage.getItem('finalamount')).toBe(price);
    localStorage.removeItem('finalamount')
    localStorage.removeItem('Productnames')
  })

  it('should add product to cart when there is price',()=>{
    const productname1='Skirt';
    let productname2='Shoe';
    const price=12;
    const service: CartService = TestBed.get(CartService);

    localStorage.setItem('Productnames',productname1)
    service.AddingtoCart(productname2,price);
    productname2=productname1 + ', ' + productname2;

    expect(localStorage.getItem('Productnames')).toBe(productname2);

    localStorage.removeItem('Productnames')
    localStorage.removeItem('finalamount')
  })

  it('should add price to cart when there is price',()=>{
    const productname1='Skirt';
    const price1=12;
    const price2=14;
    let finalamount
    const service: CartService = TestBed.get(CartService);
    localStorage.setItem('Productnames',productname1)
    localStorage.setItem('finalamount',price1.toString())

    service.AddingtoCart(productname1,price2);
    finalamount=price1+price2;
    

    expect(localStorage.getItem('finalamount')).toBe(finalamount.toString());
    
    localStorage.removeItem('Productnames')
    localStorage.removeItem('finalamount')
  });
  


  it('should get one order when the id is right',()=>{
    const service: CartService = TestBed.get(CartService);
    httpTestingController = TestBed.get(HttpTestingController);
    const userid='5uid'
    localStorage.setItem('id', userid);
    let order: Order[]=[];
    let orderListSub: Subscription;

    service.getMyOrders()
    orderListSub=service.getOrderListener().subscribe((order: Order[])=>{
      expect(order).not.toBe(null);
      expect(JSON.stringify(order)).toEqual(JSON.stringify(getmockOrder));
    })
      const req = httpTestingController.expectOne('http://localhost:3000/api/orders/'+userid)
      req.flush(getmockOrder);

      localStorage.removeItem('id');
    });
/*
    it('should save the order datas',()=>{
      const service: CartService = TestBed.get(CartService);
    httpTestingController = TestBed.get(HttpTestingController);
    
    const userid='5uid';
    const username='bill';
    const finalamount= 45;
    const productnames='Skirt,Shoe'
    localStorage.setItem('id', userid)
    localStorage.setItem('username', username)
    localStorage.setItem('finalamount', finalamount.toString())
    localStorage.setItem('Productnames', productnames)
    service.saveOrder()
      expect(postmockOrder).not.toBe(null)
    expect(postmockOrder).toEqual(getmockOrder)

    const req = httpTestingController.expectOne("http://localhost:3000/api/orders/new")
      req.flush(postmockOrder);

    localStorage.removeItem('id')
    localStorage.removeItem('username')
    localStorage.removeItem('finalamount')
    localStorage.removeItem('Productnames')

    })
*/
  it('should be created', () => {
    const service: CartService = TestBed.get(CartService);
    expect(service).toBeTruthy();
  });

});
