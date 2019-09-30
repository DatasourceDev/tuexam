import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  onBack() {
    this.router.navigate(["/login"]);
    return false;
  }
}
