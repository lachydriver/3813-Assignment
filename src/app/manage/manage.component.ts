import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { TypeCheckCompiler } from '@angular/compiler/src/view_compiler/type_check_compiler';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  superLoggedIn: boolean;
  groupAdmin: boolean;
  username = JSON.parse(localStorage.getItem('username'))
  role = JSON.parse(localStorage.getItem('role'));

  inputUsername: any;
  inputRole: any;
  inputEmail: any;
  inputGroup: any;
  inputChannel: any;
  groupname: any;
  groups: any;
  inviteGroupUsername: any;
  inviteGroupName: any;
  inviteGroup: any;
  inviteChannel: any;
  inviteUsername: any;
  selectedGroupChannels: [];
  userdata: any;
  alluserdata: any;
  inviteError: any;
  deleteUserName: any;
  deleteGroupName: any;
  deleteChannelGroupName: any;
  deleteChannelName: any;
  deleteSelectedGroupChannels: [];
  assisUserList: any;
  isAssisUser: any;
  userAssisGroups: Array<String> = [];

  checkRole(){
    if(this.role === "super"){
      this.superLoggedIn = true;
      this.groupAdmin = true;
    } else if(this.role === "groupadmin"){
      this.groupAdmin = true;
    }
  }

  addUser(){
    this.loginService.adduser(this.inputUsername, this.inputRole, this.inputEmail).subscribe(data => {
      if(data){
        alert("Successfully added user: " + this.inputUsername);
      } else {
        alert("There was an error adding the user")
      }
      this.ngOnInit();
    })
  }

  addGroup(){
    this.loginService.addgroup(this.groupname).subscribe(data => {
      if(data) {
        alert("Successfully added group: " + this.groupname);
      }
    })
  }

  getGroups(){
    this.loginService.getgroup().subscribe(data => {
      this.groups = data;
    });
  }

  getUsers(){
    this.loginService.getusers().subscribe(data => {
      this.userdata = data;
    })
  }

  addChannel(){
    this.loginService.addChannelToGroup(this.inputGroup, this.inputChannel).subscribe(data => {
      if(data) {
        this.ngOnInit();
        alert("Successfully added channel " + this.inputChannel + " in group " + this.inputGroup)
        
      }
    })
    
  }

  deleteUser(){
    this.loginService.removeUser(this.deleteUserName).subscribe(data => {
      if(data === true) {
        alert("User deleted successfully")
        this.ngOnInit();
      }
    })
  }

  deleteGroup(){
    this.loginService.deleteGroup(this.deleteGroupName).subscribe(data => {
      alert(this.deleteGroupName + " deleted successfully");
      this.ngOnInit();
    })
  }

  deleteChannel(){
    this.loginService.deleteChannel(this.deleteChannelGroupName, this.deleteChannelName).subscribe(data => {
      this.selectedGroupChannels = [];
      this.ngOnInit();
    })
  }
  
  inviteUser(){
    this.loginService.addUserToChannel(this.inviteGroup, this.inviteChannel, this.inviteUsername).subscribe(data => {
      if(data === false) {
        this.inviteError = "This user is already in this channel"
      } else if (data === true){
        this.inviteError = "Added user to channel"
      }
      this.ngOnInit()
    })
  }

  channelOptions(){
    for(let i in this.groups){
      if(this.inviteGroup === this.groups[i].name){
        this.selectedGroupChannels = this.groups[i].channels
      }
    }
  }

  deleteChannelOptions(){
    for(let i in this.groups){
      if(this.deleteChannelGroupName === this.groups[i].name){
        this.deleteSelectedGroupChannels = this.groups[i].channels
      }
    }
  }

  inviteUserToGroup(){
    this.loginService.addUserToGroup(this.inviteGroupName, this.inviteGroupUsername).subscribe(data =>
      {
        console.log(data)
        this.ngOnInit()
    });
  }

  getAssisUsers(){
    this.loginService.getAssisUsers().subscribe(data => {
      this.assisUserList = data;
      for(var i = 0; i < this.assisUserList.assisusers.length; i++){
        for(var y = 0; y < this.assisUserList.assisusers[i].assisuser.length; y++){
          if(this.username === this.assisUserList.assisusers[i].assisuser[y]){
            this.isAssisUser = true;
            this.userAssisGroups.push(this.assisUserList.assisusers[i].name)
          }
        }
      }
    })
  }

  getAssisGroups(){

  }

  ngOnInit() {
    this.checkRole();
    this.getGroups();
    this.getUsers();
    this.getAssisUsers();
    console.log(this.userAssisGroups)
  }

  ngOnChanges() {
    this.getGroups();
  }

}
