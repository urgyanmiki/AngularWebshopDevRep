import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { authModel } from '../models/auth.model';
import { Subject} from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
import { CartService } from '../shopping-cart/cart.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private token: string;
  private role: boolean;
  private id: string;
  private isauthenticated: boolean;
  private isAdmin: boolean;
  public admin:boolean;
  private idListener = new Subject<string>();
  private isAdminlistener= new Subject<boolean>();
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;
  constructor(private http: HttpClient, private router: Router) {  }

  getToken()
  {
    return this.token;
  }
  getIsAdminListener()
  {
    return this.isAdminlistener.asObservable();
  }
  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }
  getIdListener(){
    return this.idListener.asObservable();
  }
  getIsAuth(){
    return this.isauthenticated;
  }
  getIsAdmin(){ 
    return this.isAdmin;
   }
  
  
  login(username: string,password: string){
    const authData: authModel ={username: username, password: password}
    this.http.post<{id: string, token: string,username: string,role: boolean, expiresIn: number}>("http://localhost:3000/api/user/login", authData).subscribe(response =>{
      console.log(response);
      const expiresInDuration = response.expiresIn;
      this.setAuthTimer(expiresInDuration);
      const id =response.id;
      this.id = id;
      const token = response.token;
      this.token = token;
      const role = response.role;
      this.role= role;
      if(role==true){
        this.isAdminlistener.next(true);
        
      }else{
        this.isAdminlistener.next(false);
      }     
      this.isAdmin=role;
      this.authStatusListener.next(true);
      const now=new Date();
      const expirationDate = new Date(now.getTime()+ expiresInDuration*1000)
      const roleString =role.toString();
      console.log(expirationDate,roleString)
      this.saveAuthData(token,expirationDate,roleString,id)
      this.isauthenticated = true;
      console.log(this.isAdmin);
      this.router.navigate(['/']);
    })
  }

  private setAuthTimer(duration: number){
    console.log("Setting timer:" +duration);
    this.tokenTimer = setTimeout(()=>{
      this.logout();
    }, duration*1000);
  }

  logout(){
    this.token=null;
    this.authStatusListener.next(false);
    this.isAdminlistener.next(false);
    this.isAdmin=false;
    this.isauthenticated=false;
    this.router.navigate(['/']);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
  }

  private saveAuthData(token: string,expirationDate: Date,role: string,id: string){
    localStorage.setItem("token",token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("role", role);
    localStorage.setItem("id", id);
  }

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
  }

  autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn =authInformation.expirationDate.getTime() - now.getTime();
    if(expiresIn>0){
      this.token=authInformation.token;
      this.isauthenticated=true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true)
    }
    const Admin=authInformation.role
    if(Admin==true){      
      this.isAdmin=true;
      this.isAdminlistener.next(true);
    }else{
      this.isAdmin=false;
      this.isAdminlistener.next(false);
    }
  }

  private getAuthData(){
    const token =localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const role = localStorage.getItem("role");
    
    if(role=='true'){
      this.admin=true
    }else{
      this.admin=false
    }
    if (token && expirationDate && role){
      return{
        token: token,
        expirationDate: new Date(expirationDate),
        role: this.admin,        
      }
    }else{
      return;
    }
}
  public getUserId(){
    const userid = localStorage.getItem("id");
    return userid;
  }
}
