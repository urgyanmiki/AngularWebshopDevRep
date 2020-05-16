import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { ProductFormComponent } from './product-form.component';
import { from } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NewproductService } from './newproduct.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let value
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule,FormsModule],
      providers: [NewproductService],
     
      declarations: [ ProductFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  
});
