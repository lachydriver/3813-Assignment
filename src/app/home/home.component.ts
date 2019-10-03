import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { LoginService } from '../login.service';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private socketService:SocketService, private loginService:LoginService, private router:Router) { }

  manageLoggedIn: boolean;
  username = JSON.parse(localStorage.getItem('username'))
  role = JSON.parse(localStorage.getItem('role'));
  groups: any;
  selectedGroup: any;
  selectedGroupChannels: [];
  selectedChannel: String;
  messagecontent: String;
  roomnotice: String;
  messages: string[] = [];

  //Check the role of the currently logged in user, and display relevant links
  checkRole(){
    if(this.role === "super" || this.role === "groupadmin"){
      this.manageLoggedIn = true;
    }
  }

  //get the current users group data and assign to variable
  getUserInfo(){
    this.loginService.getusergroups(this.username).subscribe(data => {
      this.groups = data;
    });
  }

  //clear the local storage username and log the user out, and navigate them to the homepage
  logout(){
    localStorage.setItem('username', '');
    this.router.navigateByUrl("/");
  }

  //change selected group and call the route to join the group through the socket service
  selectGroup(name){
    this.selectedGroup = name;
    console.log(this.selectedGroup)
    this.selectChannels();
  }

  //Choose what channels the user can select based on what group they have chosen
  selectChannels(){
    for(var i = 0; i < this.groups.length; i++){
      if(this.selectedGroup === this.groups[i].name){
        this.selectedGroupChannels = this.groups[i].channels;
      }
    }
    console.log(this.selectedGroupChannels)
  }

  //leave their old room when they click on another room, and join the new room through the socket service within angular
  chosenChannel(channel){
    this.socketService.leaveroom(this.selectedGroup,this.selectedChannel, this.username);
    this.messages = [];
    this.selectedChannel = channel;
    this.socketService.joinroom(this.selectedGroup,this.selectedChannel, this.username)


  }

  //send a message to the socket service to be broadcasted to call client
  chat() {
    if(this.messagecontent) {
      this.socketService.sendMessage(this.messagecontent, this.username);
      this.messagecontent = null;
    } else {
      console.log("No message");
    }
  }

  ngOnInit() {
    //initialise sockets
    this.socketService.initSocket();
    this.socketService.getMessage((m)=>{this.messages.push(m)});
    this.socketService.notice((msg)=>{this.messages.push(msg)})
    this.checkRole();
    this.getUserInfo();
  }

}
