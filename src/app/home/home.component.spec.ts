import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeService } from './home.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [HomeService,HomeComponent],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should add to cart',()=>{
    const homecomp: HomeComponent=TestBed.get(HomeComponent);
    let productname='Skirt';
    let price=12
    homecomp.addtocart(productname,price)
    
    expect(localStorage.getItem('Productnames') ).toBe(productname)
    
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
