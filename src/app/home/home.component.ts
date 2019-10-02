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
  messages: string[] = [];

  checkRole(){
    if(this.role === "super" || this.role === "groupadmin"){
      this.manageLoggedIn = true;
    }
  }

  getUserInfo(){
    this.loginService.getusergroups(this.username).subscribe(data => {
      this.groups = data;
    })
  }

  logout(){
    localStorage.setItem('username', '');
    this.router.navigateByUrl("/");
  }

  selectGroup(name){
    this.selectedGroup = name;
    console.log(this.selectedGroup)
    this.selectChannels();
  }

  selectChannels(){
    for(var i = 0; i < this.groups.length; i++){
      if(this.selectedGroup === this.groups[i].name){
        this.selectedGroupChannels = this.groups[i].channels;
      }
    }
    console.log(this.selectedGroupChannels)
  }

  chosenChannel(channel){
    this.selectedChannel = channel;


  }

  chat() {
    if(this.messagecontent) {
      this.socketService.sendMessage(this.messagecontent);
      this.messagecontent = null;
    } else {
      console.log("No message");
    }
  }

  ngOnInit() {
    //initialise sockets
    this.socketService.initSocket();


    this.checkRole();
    this.getUserInfo();
  }

}
