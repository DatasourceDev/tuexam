import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgForm } from "@angular/forms";
import { concat } from 'rxjs';
                                                                   
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string="" ;
  password: string = "";

  constructor(private router: Router) {
   
  }

  ngOnInit() {
  }
  onSubmit() {
    console.log('form submit');
    this.router.navigate(["/dashboard"]);
    return false;
  }

  ForgotPwd() {
    this.router.navigate(["/forgot"]);
    return false;
  }
}
