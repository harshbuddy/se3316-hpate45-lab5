import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user-service.service'
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  responseUser: any;
  loggedIn: any;
  holder: any;
  
  constructor(private user:UserService, private router:Router, private http:HttpClient) { }

  ngOnInit() {
  }
  
  login(email,password,eL,pL){
    if (eL == 0 || pL == 0){
      this.responseUser = "Not all fields are filled out.";
      console.log(this.responseUser);
      
    } else {
      
      let currentUser = this.http.get('https://se3316-hpate45-lab5-harshbuddy.c9users.io:8081/api/validateUser/'+email+'/'+password);
      currentUser.subscribe((response) => {
        console.log(response);
        if (Object.keys(response).length == 0) {
          this.responseUser = "Please check the email entered.";
        } else {
          this.responseUser = response;
          
          if (this.responseUser[0].password == password){
            this.responseUser = ("Welcome " + this.responseUser[0].firstName + " " + this.responseUser[0].lastName);
            this.holder = this.responseUser[0].firstName;
            localStorage.setItem('user', JSON.stringify(response[0].firstName));
            this.loggedIn = (localStorage.getItem('user'));
          } else {
            this.responseUser = "Incorrect Password";
          }
        }
        
      });

    }
  }

}
