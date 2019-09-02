import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  manageLoggedIn: boolean;
  username = JSON.parse(localStorage.getItem('username'))
  role = JSON.parse(localStorage.getItem('role'));
  groups: any;
  selectedGroup: any;
  selectedGroupChannels: [];
  selectedChannel: String;

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
    this.selectedChannel = channel
  }

  ngOnInit() {
    this.checkRole();
    this.getUserInfo();
  }

}
