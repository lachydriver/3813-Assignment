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
    for(let i of this.groups){
      if(this.selectGroup === this.groups[i].name){
        this.selectedGroupChannels = this.groups[i].channels
      }
    }
    console.log(this.selectedGroupChannels)
  }

  ngOnInit() {
    this.checkRole();
    this.getUserInfo();
  }

}
