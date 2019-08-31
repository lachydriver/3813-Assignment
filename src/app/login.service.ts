import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User {
  username: String;
  role: String;
  valid: boolean;
  groupAdminRole: boolean;
}

export interface Group {
  name: String;
  channels: String;
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

  addgroup(groupname: String){
    return this.http.post<Group>(this.url + "/api/addgroup", {groupname})
  }

  getgroup(){
    return this.http.get<Group>(this.url + "/api/getgroups")
  }

  addChannelToGroup(inputGroup: String, inputChannel: String){
    return this.http.post<Group>(this.url + "/api/addchannel", {inputGroup, inputChannel})
  }

  addUserToChannel(inputGroup: String, inputChannel: String, inputUsername){
    return this.http.post<User>(this.url + "/api/addusertochannel", {inputGroup, inputChannel, inputUsername})
  }

  getusers(){
    return this.http.get<User>(this.url + "/api/getusers")
  }
}
