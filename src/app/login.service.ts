import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User {
  email: String;
  valid: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginurl = "http://localhost:3000/api/login";

  constructor(private http:HttpClient) { }

  login(inputEmail: string){
    return this.http.post<User>(this.loginurl, {inputEmail: inputEmail})
    
  }
}
