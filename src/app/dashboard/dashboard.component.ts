import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user-service.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  response: any;
  response2: any;
  loadVal: number;
  currentUser: string;
  currentUserStrength: number;
  shoppingCart: any;
  

  constructor( private user:UserService,private router:Router,private http:HttpClient) {
    this.loadVal=0;
    this.shoppingCart = [];
    this.currentUser = localStorage.user;
    this.currentUser = this.currentUser.replace('"','');
    this.currentUser = this.currentUser.replace('"','');

  }

  ngOnInit() {
    let allGames = this.http.get('https://se3316-hpate45-lab5-harshbuddy.c9users.io:8081/api/dashboard');
    allGames.subscribe((response) => {
      this.response = response;
    })
    
    if (this.currentUser != null && this.currentUser!="Harsh" && this.currentUser != ""){
      this.currentUserStrength = 1;
    } else if (this.currentUser == "Harsh") {
      this.currentUserStrength = 2;
    }
    
    if (this.currentUserStrength == 1) {
      console.log("Average User Connected");
    }
  }
  
  showMoreData(id) {
    if (this.loadVal == 1){
      this.loadVal = this.loadVal-1;
    } else {
      let gameNeeded = this.http.get('https://se3316-hpate45-lab5-harshbuddy.c9users.io:8081/api/dashboard/'+id);
    gameNeeded.subscribe((response2) => {
      this.response2 = response2;
    })
      this.loadVal = this.loadVal+1;
    }
  }
  
  addtocart(title,price){
    this.shoppingCart.push([title,price]);
    console.log(this.shoppingCart);
  }

}
