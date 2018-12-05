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
  shoppingCart=[];
  cartTotal: number;
  found: boolean;
  checkCancel: boolean;
  checkBuy: boolean;
  finalCart = [];
  finalCost: number;
  reviewOn=false;
  checkPublish: boolean;
  activateColl=false;
  newItemActivate=false;
  response3:any;
  startModify = false;
  modifyTitle: any;

  

  constructor( private user:UserService,private router:Router,private http:HttpClient) {
    this.loadVal = 0;
    this.cartTotal = 0;
    if (localStorage.getItem('user')!=null){
      this.currentUser = localStorage.user;
      this.currentUser = this.currentUser.replace('"','');
      this.currentUser = this.currentUser.replace('"','');
    }
    

  };

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
  };
  
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
  };
  
  addtocart(title,price) {
    if(this.shoppingCart.length < 1){
      this.shoppingCart.push([title,price,1]);
      this.cartTotal += price;
      this.cartTotal = Math.round(this.cartTotal*100)/100;
    } else {
      for(var x = 0; x < this.shoppingCart.length; x++) {
        if (this.shoppingCart[x][0] == title){
          this.shoppingCart[x][2] += 1;
          this.cartTotal += price;
          this.cartTotal = Math.round(this.cartTotal*100)/100;
          this.found=true;
        }
      }
      if(this.found!=true){
        this.shoppingCart.push([title,price,1]);
        this.cartTotal += price;
        this.cartTotal = Math.round(this.cartTotal*100)/100;
      }
      
    }
    console.log(this.shoppingCart);
  };
  
  removeItem(title) {
    for(var x = 0; x < this.shoppingCart.length; x++){
      if(this.shoppingCart[x][0] == title){
        this.cartTotal = this.cartTotal - this.shoppingCart[x][1];
        this.cartTotal = Math.round(this.cartTotal*100)/100;
        this.shoppingCart.splice(x,1);
      }
    }
  };
  
  addQuantity(title) {
    for(var x = 0; x < this.shoppingCart.length; x++){
      if(this.shoppingCart[x][0] == title){
        this.cartTotal = this.cartTotal + this.shoppingCart[x][1];
        this.cartTotal = Math.round(this.cartTotal*100)/100;
        this.shoppingCart[x][2] += 1;
      }
    }
  };
  
  remQuantity(title) {
    for(var x = 0; x < this.shoppingCart.length; x++){
      if(this.shoppingCart[x][0] == title){
        if(this.shoppingCart[x][2]==1){
          this.cartTotal = this.cartTotal - this.shoppingCart[x][1];
          this.cartTotal = Math.round(this.cartTotal*100)/100;
          this.shoppingCart.splice(x,1);
        } else {
          this.cartTotal = this.cartTotal - this.shoppingCart[x][1];
          this.cartTotal = Math.round(this.cartTotal*100)/100;
          this.shoppingCart[x][2] -= 1;
        }
      }
    }
  };
  
  clearCart(){
    this.checkCancel = confirm("Are you sure you want to empty your cart?");
    if(this.checkCancel){
      this.shoppingCart = [];
      this.cartTotal = 0;
    }
  }
  
  buyCart(){
    this.checkBuy = confirm("Would you like to confirm your purchase?");
    if(this.checkBuy){
      this.finalCart = this.shoppingCart;
      this.finalCost = this.cartTotal;
      this.shoppingCart = [];
      this.cartTotal = 0;
    }
  }
  
  makeReview(title){
    this.reviewOn = true;
    
  }
  
  submitReview(title,rating,review){
    this.checkPublish = confirm("Are you sure you want to save this review?");
    if(this.checkPublish){
      if(title==""||rating==""||review==""){
        alert("Not all fields are completed.");
        return false;
      }
      console.log("published");
      this.reviewOn = false;
    }
  }
  
  startMakeCollection(){
    if (this.activateColl == false){
      this.activateColl = true;
    } else {
      this.activateColl = false;
    }
  }
  
  deleteItem(title){
    this.http.post('https://se3316-hpate45-lab5-harshbuddy.c9users.io:8081/api/deleteGame', {'title' : title}).subscribe(data=>{
      this.response3 = data.message; 
    });
  }
  
  modifyItem(title){
    if(this.startModify == false){
      this.startModify = true;
    } else {
      this.startModify = false;
    }
    this.modifyTitle = title;
  }
  
  finalModify(price,stock,desc){
    this.http.post('https://se3316-hpate45-lab5-harshbuddy.c9users.io:8081/api/modifyGame', {'title' : this.modifyTitle, 'desc' : desc, 'stock' : stock, 'price' : price}).subscribe(data=>{
      this.response3 = data.message; 
    });
  }
  
  newItem(){
    if(this.newItemActivate == false){
      this.newItemActivate = true;
    } else {
      this.newItemActivate = false;
    }
    
  }
  
  makeNewItem(title,price,desc,stock,imgLink){
    this.newItemActivate = false;
    this.http.post('https://se3316-hpate45-lab5-harshbuddy.c9users.io:8081/api/addGame/', { 'title' : title, 'stockNum' : stock, 'gamedesc' : desc, 'gamePrice' : price, 'imgLink' : imgLink}).subscribe(data=>{
      this.response3 = data.message; 
    });
  }
  
}
