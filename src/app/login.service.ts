import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User {
  username: String;
  role: String;
  valid: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginurl = "http://localhost:3000/api/login";

  constructor(private http:HttpClient) { }

  login(inputUsername: string){
    return this.http.post<User>(this.loginurl, {inputUsername: inputUsername})
    
  }
}
