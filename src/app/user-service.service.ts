import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})

export class UserService {
  response: any;
  
  constructor(private http: HttpClient) { }

  
  
}
