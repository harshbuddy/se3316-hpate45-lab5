//import required modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})


export class PolicyComponent implements OnInit {
  //define variables needed for class
  response: any;
  response3: any;
  currentUser: string;
  currentUserStrength: number;

  //class constructor 
  constructor(private user:UserService,private router:Router,private http:HttpClient) { 
    //check if user is currenlty logged in
    if (localStorage.getItem('user')!=null){
      this.currentUser = localStorage.user;
      this.currentUser = this.currentUser.replace('"','');
      this.currentUser = this.currentUser.replace('"','');
    }
  }
  //on class load
  ngOnInit() {
    //check which level of user is in
    if (this.currentUser != null && this.currentUser!="Harsh" && this.currentUser != ""){
      this.currentUserStrength = 1;
    } else if (this.currentUser == "Harsh") {
      this.currentUserStrength = 2;
    }
    //load policies
    let policies = this.http.get('https://se3316-hpate45-lab5-harshbuddy.c9users.io:8081/api/policy');
    policies.subscribe((response) => {
      this.response = response;
    })
  }
  //functions to email admin based on what the user has an issue for
  emailTD(){
    window.open('mailto:hpate45@uwo.ca?subject=Takedown&body=Please takedown this site immediately');
  }
  
  emailIF(){
    window.open('mailto:hpate45@uwo.ca?subject=Infringement&body=Submitting an infringement notice');
  }
  
  emailDC(){
    window.open('mailto:hpate45@uwo.ca?subject=Dispute&body=Submitting a dispute claim');
  }
  
  //change security policy
  newSecurity(security){
    this.http.post('https://se3316-hpate45-lab5-harshbuddy.c9users.io:8081/api/modifySecurity', {'newSecurityValue' : security}).subscribe(data=>{
      this.response3 = data.message; 
    });
  }
  //change privacy policy
  newPrivacy(privacy){
    this.http.post('https://se3316-hpate45-lab5-harshbuddy.c9users.io:8081/api/modifyPrivacy', {'newPrivacyValue' : privacy}).subscribe(data=>{
      this.response3 = data.message; 
    });
  }
  //change dmca policy
  newDMCA(dmca){
    this.http.post('https://se3316-hpate45-lab5-harshbuddy.c9users.io:8081/api/modifyDMCA', {'newDMCA' : dmca}).subscribe(data=>{
      this.response3 = data.message; 
    });
  }
  
}
