import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from './cart.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

describe('CartService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule
    ],
    providers:[
      
      LoginService
    ]
  }));

  it('should be created', () => {
    const service: CartService = TestBed.get(CartService);
    expect(service).toBeTruthy();
  });
});
