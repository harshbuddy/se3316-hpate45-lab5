import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user-service.service'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private user:UserService, private router:Router) { }

  ngOnInit() {
  }
  
  login(email,password){
    this.user.checkUser(email,password);
  }

}
