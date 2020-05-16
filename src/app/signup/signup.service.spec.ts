import { TestBed, ɵTestingCompiler } from '@angular/core/testing';
import { User } from 'src/app/models/user.model';
import { SignupService } from './signup.service';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { RouterLinkActive } from '@angular/router';

describe('SignupService', () => {

  let signupService: SignupService;
  let httpTestingController: HttpClientTestingModule;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers:[
      SignupService
    ]
  }));

  httpTestingController=TestBed.get(HttpClientTestingModule);
  signupService=TestBed.get(SignupService);
  
  it('should save user data',()=>{
    const testUser: User={username: 'tester',firstname: 'hal',lastname: 'lak',
    email: 'hal@lak.com', role: false, password: 'passwd',
    city: 'Miskolc', address: 'Going str', zipcode:23}

    signupService.signup(testUser).subscribe((response)=>{
      expect(response).toBe(testUser)
    })
    
  });

  

  it('should be created', () => {
    const service: SignupService = TestBed.get(SignupService);
    expect(service).toBeTruthy();
  });
});
