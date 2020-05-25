import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutComponent } from './check-out.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CartService } from '../shopping-cart/cart.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ElementRef, asNativeElements } from '@angular/core';

describe('CheckOutComponent', () => {
  let component: CheckOutComponent;
  let fixture: ComponentFixture<CheckOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
        
      ],
      providers:[
        CartService,
        
      ],
      declarations: [ CheckOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});
