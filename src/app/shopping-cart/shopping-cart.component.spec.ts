import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartComponent } from './shopping-cart.component';
import { CartService } from './cart.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [CartService,ShoppingCartComponent],
      declarations: [ ShoppingCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should delete from local storage',()=>{
    localStorage.setItem('finalamount','1')
    localStorage.setItem('Productnames','Skirt')
    const shopcart: ShoppingCartComponent = TestBed.get(ShoppingCartComponent)
    shopcart.onDelete();
    expect(localStorage.getItem('finalamount') || localStorage.getItem('Productnames')).toBe(null);
    localStorage.removeItem('Productnames')
  });

  it('should manipulate the products into an array',()=>{
    localStorage.setItem('Productnames','Skirt, Shoe')
    const products=['Skirt',' Shoe']
    const shopcart: ShoppingCartComponent = TestBed.get(ShoppingCartComponent)
    shopcart.manipulateNames()
    expect(shopcart.manipulateNames()).toEqual(products)
    localStorage.removeItem('Productnames')
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
