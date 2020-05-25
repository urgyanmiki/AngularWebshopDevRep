import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from './login.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getLocaleDateTimeFormat } from '@angular/common';
import { authModel } from '../models/auth.model';
import { Subscription } from 'rxjs';
const now = new Date()

const mocklogin={
    id: 'tid',  
    token: 'token4',
    username: 'test',
    password: 'khj',
    role: true,
    expiresIn: new Date(now.getTime()),
}

describe('LoginService', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule
    ],
    providers:[
      LoginService
    ]
  }));


  it('should get the username',()=>{
    const username='Mark';
    const service: LoginService = TestBed.get(LoginService);
    localStorage.setItem('username',username)
    
    expect(service.getUserName()).toBe(username);

    localStorage.removeItem('username')
  })
  it('should get the id',()=>{
    const id='50a';
    const service: LoginService = TestBed.get(LoginService);
    localStorage.setItem('id',id)
    
    expect(service.getUserId()).toBe(id);

    localStorage.removeItem('id')
  })
  it('should not auto autanticate the user',()=>{
    const token = 'ga'
    const exp='2020-05-21T21:48:09.192Z'
    const role='false'
    localStorage.setItem("token",token);
    localStorage.setItem("expiration",exp);
    localStorage.setItem("role",role);
    const service: LoginService = TestBed.get(LoginService);
    
    expect(service.autoAuthUser).toBeTruthy();

    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("role");
    
  })
  it('should do the logout',()=>{
    const token = 'ga'
    const exp='2020-05-21T21:48:09.192Z'
    const role='false'
    const id='hd2'
    localStorage.setItem("token",token);
    localStorage.setItem("expiration",exp);
    localStorage.setItem("role",role);
    localStorage.setItem("id",id);

    const service: LoginService = TestBed.get(LoginService);

    service.logout()
    expect(localStorage.getItem("token")).toBeNull();
  })

  it('should login',()=>{
    let auth
    let isadmin
    httpTestingController = TestBed.get(HttpTestingController);
    let authListenerSubs:Subscription
    let adminlisterSub: Subscription
    const username='test';
    const password='khj';
    const service: LoginService = TestBed.get(LoginService);
    let endpoint='http://localhost:3000/api/user/login'
    service.login(username,password)
    authListenerSubs = service.getAuthStatusListener().subscribe(
      isAuthenticated =>{
        auth=isAuthenticated
        expect(auth).toBeTruthy();
      });
    
    adminlisterSub=service.getIsAdminListener().subscribe(admin=>{
      isadmin=admin
      expect(isadmin).toBeTruthy()
    })
    
    const req = httpTestingController.expectOne(endpoint)
    req.flush(mocklogin);
      
  })

  it('should be created', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });
});
