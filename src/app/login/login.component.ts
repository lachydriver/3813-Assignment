import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginService, User } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {

  inputEmail: any;
  error: any;



  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit() {
  }

  submitClicked(){
     this.loginService.login(this.inputEmail).subscribe(data => {
       if(data.valid === true){
         this.router.navigateByUrl("/home")
       } else {
         console.log("DATA NOT VALID")
       }
     }

     )
     }
}
