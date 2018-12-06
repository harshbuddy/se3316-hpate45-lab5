import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logoutMessage: String;
  
  constructor(private router:Router) { }

  ngOnInit() {
  }
  //function to reset values based on logout
  logoutChange(){
    localStorage.clear();
    window.location.reload();
  }
}
