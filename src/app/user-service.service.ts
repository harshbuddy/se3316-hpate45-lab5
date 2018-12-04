import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})

export class UserService {
  response: any;
  
  constructor(private http: HttpClient) { }
  
  checkUser(email,password){
    
    let currentUser = this.http.get('https://se3316-hpate45-lab5-harshbuddy.c9users.io:8081/api/validateUser/'+email+'/'+password);
    currentUser.subscribe((response) => {
      this.response = response;
      console.log(response);
    })
    console.log(this.response);
    return this.response;
  }
  
  registerUser(first,last,email,password){
    console.log(first,last,email,password);
  }
  
  
}
