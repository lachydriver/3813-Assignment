import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  superLoggedIn: boolean;
  groupAdmin: boolean;
  email = JSON.parse(localStorage.getItem('username'))
  role = JSON.parse(localStorage.getItem('role'));
  groupAdminRole = JSON.parse(localStorage.getItem('groupAdminRole'));

  inputUsername: any;
  inputRole: any;

  checkRole(){
    if(this.role === "super"){
      this.superLoggedIn = true;
    }
    if(this.groupAdminRole === "true"){
      this.groupAdmin = true;
    }
  }

  addUser(){
    this.loginService.adduser(this.inputUsername, this.inputRole).subscribe(data => {
      if(data){
        alert("Successfully added user: " + this.inputUsername);
      } else {
        alert("There was an error adding the user")
      }
    })
  }

  ngOnInit() {
    this.checkRole()
  }

}
