//import required modules
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
  //create variables needed for class
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

  
  //on class creation run this
  constructor( private user:UserService,private router:Router,private http:HttpClient) {
    //make some variables have a value
    this.loadVal = 0;
    this.cartTotal = 0;
    //check for if user is currently logged in 
    if (localStorage.getItem('user')!=null){
      this.currentUser = localStorage.user;
      this.currentUser = this.currentUser.replace('"','');
      this.currentUser = this.currentUser.replace('"','');
    }
  };

  //on class load, load all the games from database
  ngOnInit() {
    let allGames = this.http.get('https://se3316-hpate45-lab5-harshbuddy.c9users.io:8081/api/dashboard');
    allGames.subscribe((response) => {
      this.response = response;
    })
    //check level of authentication
    if (this.currentUser != null && this.currentUser!="Harsh" && this.currentUser != ""){
      this.currentUserStrength = 1;
    } else if (this.currentUser == "Harsh") {
      this.currentUserStrength = 2;
    } 
    
    if (this.currentUserStrength == 1) {
      console.log("Average User Connected");
    }
  };
  //function to show additional game data
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
  //function to add games to cart
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
  //function to remove items from cart
  removeItem(title) {
    for(var x = 0; x < this.shoppingCart.length; x++){
      if(this.shoppingCart[x][0] == title){
        this.cartTotal = this.cartTotal - this.shoppingCart[x][1];
        this.cartTotal = Math.round(this.cartTotal*100)/100;
        this.shoppingCart.splice(x,1);
      }
    }
  };
  //function to increase quantity
  addQuantity(title) {
    for(var x = 0; x < this.shoppingCart.length; x++){
      if(this.shoppingCart[x][0] == title){
        this.cartTotal = this.cartTotal + this.shoppingCart[x][1];
        this.cartTotal = Math.round(this.cartTotal*100)/100;
        this.shoppingCart[x][2] += 1;
      }
    }
  };
  //function to decrease quantity
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
  //function to clear all items from cart
  clearCart(){
    this.checkCancel = confirm("Are you sure you want to empty your cart?");
    if(this.checkCancel){
      this.shoppingCart = [];
      this.cartTotal = 0;
    }
  }
  //function to complete transaction
  buyCart(){
    this.checkBuy = confirm("Would you like to confirm your purchase?");
    if(this.checkBuy){
      this.finalCart = this.shoppingCart;
      this.finalCost = this.cartTotal;
      this.shoppingCart = [];
      this.cartTotal = 0;
    }
  }
  //function to start making reviews
  makeReview(title){
    this.reviewOn = true;
    
  }
  //function to create and publish a new review
  submitReview(title,rating,review,gameTitle){
    this.checkPublish = confirm("Are you sure you want to save this review?");
    if(this.checkPublish){
      if(title==""||rating==""||review==""){
        alert("Not all fields are completed.");
        return false;
      }
      this.http.post('https://se3316-hpate45-lab5-harshbuddy.c9users.io:8081/api/newReview', { 'title' : gameTitle, 'reviewsWriter' : localStorage.user, 'reviewsText' : review, 'reviewsTitle' : title, 'reviewsRating' : rating}).subscribe(data=>{
        console.log(data); 
        console.log("published");
      });
      
      this.reviewOn = false;
    }
  }
  //create new collection input values
  startMakeCollection(){
    if (this.activateColl == false){
      this.activateColl = true;
    } else {
      this.activateColl = false;
    }
  }
  //function to delete game from database
  deleteItem(title){
    this.http.post('https://se3316-hpate45-lab5-harshbuddy.c9users.io:8081/api/deleteGame', {'title' : title}).subscribe(data=>{
      this.response3 = data.message; 
    });
  }
  //function to modify game values
  modifyItem(title){
    if(this.startModify == false){
      this.startModify = true;
    } else {
      this.startModify = false;
    }
    this.modifyTitle = title;
  }
  //confirm modifications to game
  finalModify(price,stock,desc){
    this.http.post('https://se3316-hpate45-lab5-harshbuddy.c9users.io:8081/api/modifyGame', {'title' : this.modifyTitle, 'desc' : desc, 'stock' : stock, 'price' : price}).subscribe(data=>{
      this.response3 = data.message; 
    });
  }
  //function to create a new item
  newItem(){
    if(this.newItemActivate == false){
      this.newItemActivate = true;
    } else {
      this.newItemActivate = false;
    }
    
  }
  //function to finalize new item
  makeNewItem(title,price,desc,stock,imgLink){
    this.newItemActivate = false;
    this.http.post('https://se3316-hpate45-lab5-harshbuddy.c9users.io:8081/api/addGame/', { 'title' : title, 'stockNum' : stock, 'gamedesc' : desc, 'gamePrice' : price, 'imgLink' : imgLink}).subscribe(data=>{
      this.response3 = data.message; 
    });
  }
  
}
