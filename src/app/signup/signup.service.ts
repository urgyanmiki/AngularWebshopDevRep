import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient } from "@angular/common/http";
import { NgForm } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class SignupService {

  

  constructor(private http: HttpClient) { }

  signup(user: User){
    this.http.post("http://localhost:3000/api/user/signup", user).subscribe(response=>{
      console.log(response)
      return response;
  });
}
  
}
