import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgForm } from "@angular/forms";
import { concat } from 'rxjs';

@Component({
  selector: 'app-login-student',
  templateUrl: './login-student.component.html',
  styleUrls: ['./login-student.component.css']
})
export class LoginStudentComponent implements OnInit {
  username: string = "";
  password: string = "";
  constructor(private router: Router) {

  }


  ngOnInit() {
 
  }
  onSubmit() {
    console.log('form submit');
    this.router.navigate(["/examination-select"]);
    return false;
  }
}
