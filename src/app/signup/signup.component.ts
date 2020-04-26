import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgForm } from "@angular/forms";
import {SignupService} from './signup.service'
import { from } from 'rxjs';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private user: User[] = [];
  constructor(public sigunpService: SignupService) { }

  /*checkPassword(group: FormGroup){
    let password = group.get('password').value;
    let cpassword = group.get('cpassword').value;
    return password === cpassword ? null : {notSame: true};
  }
*/

  signup(user){
    this.sigunpService.signup(user);
  }

  ngOnInit() {
  }


}
