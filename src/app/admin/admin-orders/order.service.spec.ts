import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/order.model';

export const getmockOrder: Order ={
  orderid: '5oid',
  userid: '5uid',
  products: 'Skirt,Shoe',
  finalamount: 45,
  username: 'bill'
}

describe('OrderService', () => {
  let httpTestingController: HttpTestingController;
  beforeEach(() => TestBed.configureTestingModule({
    
    imports: [
      HttpClientTestingModule,
      
    ],
    providers:[
      OrderService
    ]
  }));

  it('should get all orders',()=>{
    httpTestingController = TestBed.get(HttpTestingController);
    const service: OrderService = TestBed.get(OrderService);
    let myorderListener: Subscription
    let order: Order[]=[];

    service.getOrders();
    myorderListener=service.getOrderUpdateListener().subscribe((order: Order[])=>{
      expect(order).not.toBe(null);
      expect(JSON.stringify(order)).toEqual(JSON.stringify(getmockOrder));
    })
    
    const req = httpTestingController.expectOne('http://localhost:3000/api/orders/getall/all')
      req.flush(getmockOrder);
  })

  it('should be created', () => {
    const service: OrderService = TestBed.get(OrderService);
    expect(service).toBeTruthy();
  });
});
