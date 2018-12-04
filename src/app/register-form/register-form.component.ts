import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user-service.service'

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  constructor(private user:UserService, private router:Router) { }

  ngOnInit() {
  }

  register(first,last,email,password){
    this.user.registerUser(first,last,email,password);
  }
}
