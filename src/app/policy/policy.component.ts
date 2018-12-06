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
  response: any;
  currentUser: string;
  currentUserStrength: number;

  constructor(private user:UserService,private router:Router,private http:HttpClient) { 
    if (localStorage.getItem('user')!=null){
      this.currentUser = localStorage.user;
      this.currentUser = this.currentUser.replace('"','');
      this.currentUser = this.currentUser.replace('"','');
    }
  }

  ngOnInit() {
    if (this.currentUser != null && this.currentUser!="Harsh" && this.currentUser != ""){
      this.currentUserStrength = 1;
    } else if (this.currentUser == "Harsh") {
      this.currentUserStrength = 2;
    }
    
    let policies = this.http.get('https://se3316-hpate45-lab5-harshbuddy.c9users.io:8081/api/policy');
    policies.subscribe((response) => {
      this.response = response;
    })
  }
  
  emailTD(){
    window.open('mailto:hpate45@uwo.ca?subject=Takedown&body=Please takedown this site immediately');
  }
  
  emailIF(){
    window.open('mailto:hpate45@uwo.ca?subject=Infringement&body=Submitting an infringement notice');
  }
  
  emailDC(){
    window.open('mailto:hpate45@uwo.ca?subject=Dispute&body=Submitting a dispute claim');
  }

}
