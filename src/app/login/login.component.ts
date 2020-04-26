import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { authModel } from 'src/app/models/auth.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }
  
  login(form: NgForm){
    this.loginService.login(form.value.username,form.value.password)
    console.log(form.value.username);
  }
}
