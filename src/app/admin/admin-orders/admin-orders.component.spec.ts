import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersComponent } from './admin-orders.component';
import { OrderService } from './order.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminOrdersComponent', () => {
  let component: AdminOrdersComponent;
  let fixture: ComponentFixture<AdminOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ 
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [OrderService],
      declarations: [ AdminOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
