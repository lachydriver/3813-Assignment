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

  adduser(inputUsername: String, inputRole: String, inputEmail: String){
    return this.http.post<User>(this.url + "/api/adduser", {inputUsername, inputRole, inputEmail})
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

  addUserToChannel(inviteGroup: String, inviteChannel: String, inviteUsername: String){
    return this.http.post(this.url + "/api/addusertochannel", {inviteGroup, inviteChannel, inviteUsername})
  }

  getusers(){
    return this.http.get<User>(this.url + "/api/getusers")
  }

  getusergroups(username: String){
    return this.http.post(this.url + "/api/getusergroups", { username })
  }

  addUserToGroup( inviteGroupName: String, inviteGroupUsername: String){
    return this.http.post<User>(this.url + "/api/addgrouptouser", {inviteGroupName, inviteGroupUsername})
  }

  removeUser(deleteUserName: String){
    return this.http.post(this.url + "/api/deleteuser", {deleteUserName})
  }

  deleteGroup(deleteGroupName: String){
    return this.http.post(this.url + "/api/deletegroup", {deleteGroupName})
  }

  deleteChannel(deleteChannelGroupName: String, deleteChannelName: String){
    return this.http.post(this.url + "/api/deletechannel", {deleteChannelGroupName, deleteChannelName})
  }

  getAssisUsers(){
    return this.http.get(this.url + "/api/getgroupassis")
  }

  deleteChannelfromGroup(deleteGroupFromUser: String, deleteGroupFromUserGroup: String){
    return this.http.post(this.url + "/api/removeuserfromgroup", {deleteGroupFromUser, deleteGroupFromUserGroup})
  }

  deleteChannelfromUser(removeChannelUserName: String, removeChannelGroupName: String, removeChannelFromUser: String){
    return this.http.post(this.url + "/api/removeuserfromchannel", {removeChannelUserName, removeChannelGroupName, removeChannelFromUser})
  }
}
