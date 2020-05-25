import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from './login.service';
import { FormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { linkSync } from 'fs';
import { By } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import {  ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent(integrated testing of login)', () => {
  
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule,FormsModule,ReactiveFormsModule],
      providers: [LoginService,FormBuilder],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    /*
    router=TestBed.get(router);
    spyOn(router,'navigateByUrl')
    */
  });
  
  it('should navigate if you click',()=>{
    
    let username = component.form.controls['username']
    username.setValue('testuser')
    
    let password = component.form.controls['password']
    password.setValue('testpassword');
    const loginbutton = fixture.debugElement.query(By.css('login')).nativeElement;
    const service: LoginService = TestBed.get(LoginService);

    loginbutton.click();
    
    expect(service.login(username.value,password.value)).toHaveBeenCalled();
  })
  it('should the form be invalid',()=>{
    expect(component.form.valid).toBeFalsy();
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
