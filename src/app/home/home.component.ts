import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  manageLoggedIn: boolean;
  email = JSON.parse(localStorage.getItem('username'))
  role = JSON.parse(localStorage.getItem('role'));

  checkRole(){
    if(this.role === "super" || this.role === "groupadmin"){
      this.manageLoggedIn = true;
    }
  }

  ngOnInit() {
    this.checkRole()
  }

}
