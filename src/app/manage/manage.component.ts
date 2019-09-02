import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { LoginService } from '../login.service';
import { TypeCheckCompiler } from '@angular/compiler/src/view_compiler/type_check_compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  constructor(private loginService:LoginService, private router:Router) { }

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
  removeChannelUserName: any;
  removeChannelGroupName: any;
  removeChannelfromUser: any;
  removeGroupNamePossibilities: Array<String> = [];
  removeChannelNamePossibilities: Array<String> = [];
  deleteGroupFromUser: any;
  deleteGroupFromUserGroup: any;
  deleteGroupFromUserPossibilities: [];

  logout(){
    localStorage.setItem('username', '');
    this.router.navigateByUrl("/");
  }

  goBack(){
    this.router.navigateByUrl("/home");
  }

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
      if(data === false){
        alert("User already exists");
      } else if(data === true) {
        alert("User added successfully")
      }
      this.ngOnInit();
    })
  }

  addGroup(){
    this.loginService.addgroup(this.groupname).subscribe(data => {
      if(data) {
        alert("Successfully added group: " + this.groupname);
        this.ngOnInit();
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
        alert("Successfully added channel " + this.inputChannel + " in group " + this.inputGroup)
        this.ngOnInit();

        
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

  groupOptions(){
    for(let i in this.userdata){
      if(this.removeChannelUserName === this.userdata[i].username){
        this.removeGroupNamePossibilities = this.userdata[i].groups;
      }
    }
  }

  deleteGroupOptions(){
    for(let i in this.userdata){
      if(this.deleteGroupFromUser === this.userdata[i].username){
        this.deleteGroupFromUserPossibilities = this.userdata[i].groups;
      }
    }
  }

  removeChannelOptions(){
    for(let i in this.userdata){
      if(this.removeChannelUserName === this.userdata[i].username){
        for(let y in this.userdata[i].groups){
          if(this.removeChannelGroupName === this.userdata[i].groups[y].name){
            this.removeChannelNamePossibilities = this.userdata[i].groups[y].channels
          }
        }
      }
    }
    console.log(this.removeChannelNamePossibilities)
  }

  deleteChannelfromUser(){
    this.loginService.deleteChannelfromUser(this.removeChannelUserName, this.removeChannelGroupName, this.removeChannelfromUser).subscribe(data => {
      this.ngOnInit();
    })
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

  deleteGroupFromUserFunction(){
    this.loginService.deleteGroupFromUser(this.deleteGroupFromUser, this.deleteGroupFromUserGroup).subscribe(data => {
      alert("Deleted group from user");
      this.ngOnInit();
    })
  }

  getAssisGroups(){

  }

  resetVariables(){
  this.inputUsername = undefined;
  this.inputRole = undefined;
  this.inputEmail = undefined;
  this.inputGroup = undefined;
  this.inputChannel = undefined;
  this.groupname = undefined;
  this.inviteGroupUsername = undefined;
  this.inviteGroupName = undefined;
  this.inviteGroup = undefined;
  this.inviteChannel = undefined;
  this.inviteUsername = undefined;
  this.selectedGroupChannels = [];
  this.inviteError = undefined;
  this.deleteUserName = undefined;
  this.deleteGroupName = undefined;
  this.deleteChannelGroupName = undefined;
  this.deleteChannelName = undefined;
  this.deleteSelectedGroupChannels = [];
  this.userAssisGroups = [];
  this.removeChannelUserName = undefined;
  this.removeChannelGroupName = undefined;
  this.removeChannelfromUser = undefined;
  this.removeGroupNamePossibilities = [];
  this.removeChannelNamePossibilities = [];
  this.deleteGroupFromUser = undefined;
  this.deleteGroupFromUserGroup = undefined;
  this.deleteGroupFromUserPossibilities = [];
  }

  ngOnInit() {
    this.checkRole();
    this.getGroups();
    this.getUsers();
    this.getAssisUsers();
    this.resetVariables();
    console.log(this.userAssisGroups)
  }

  ngOnChanges() {
    this.getGroups();
  }

}
