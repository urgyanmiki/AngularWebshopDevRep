import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { authModel } from 'src/app/models/auth.model';
import { read } from 'fs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: NgForm
 
  constructor(private loginService: LoginService,private fb: FormBuilder) { }

  ngOnInit() {
    
  }
  
  login(form: NgForm){
    this.loginService.login(form.value.username,form.value.password)
    console.log(form.value.username);
  }
}
