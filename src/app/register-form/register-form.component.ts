import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user-service.service'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  responseNewUser: any;
  
  constructor(private user:UserService, private router:Router, private http:HttpClient) { }

  ngOnInit() {
  }

  register(firstI,lastI,emailI,passwordI,fL,lL,eL,pL){
    
    if (eL == 0 || pL == 0 || fL == 0 || lL == 0){
      
      this.responseNewUser = "Not all fields are filled out.";
      console.log(this.responseNewUser);
      
    } else {
      
      let newUser = this.http.post('https://se3316-hpate45-lab5-harshbuddy.c9users.io:8081/api/newUser/'+emailI+'/'+passwordI+'/'+firstI+'/'+lastI);
      newUser.subscribe((response) => {
        console.log(response.message);
        this.responseNewUser = response.message;
        if (Object.keys(response).length == 0) {
          this.responseNewUser = "Please try again, something went wrong.";
        } else {
          this.responseNewUser = response.message;
          console.log(this.responseNewUser);
        }
      });
      console.log(this.responseNewUser);

    }
  }
  
  
}
