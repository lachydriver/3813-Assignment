import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User {
  username: String;
  role: String;
  valid: boolean;
  groupAdminRole: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = "http://localhost:3000";

  constructor(private http:HttpClient) { }

  login(inputUsername: string){
    return this.http.post<User>(this.url + "/api/login", {inputUsername: inputUsername})
    
  }

  adduser(inputUsername: String, inputRole: String){
    return this.http.post<User>(this.url + "/api/adduser", {inputUsername, inputRole})
  }
}
