import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {

  inputEmail: any;
  inputPassword: any;
  error: any;

  loginurl: "http://localhost:3000/api/login";



  constructor(private http:HttpClient) { }

  ngOnInit() {
  }

  postUser(){
    this.http.post(this.loginurl, this.inputEmail).subscribe(res => {console.log(res)},
    (err: HttpErrorResponse) => {
      console.log(err.error);
    })
  }

}
