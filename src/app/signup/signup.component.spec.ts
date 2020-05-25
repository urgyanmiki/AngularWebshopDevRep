import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { SignupService } from './signup.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user.model';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      providers: [SignupService],
      declarations: [ SignupComponent ]
    })
    .compileComponents();
  }));

  it('should call the service with user datas',()=>{
    const testUser: User={username: 'tester',firstname: 'hal',lastname: 'lak',
    email: 'hal@lak.com', role: false, password: 'passwd',
    city: 'Miskolc', address: 'Going str', zipcode:23}

    

  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
