import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, Event as NavigationEvent } from '@angular/router';
import { AppService } from '../../share/service/app.service';
import { SessionService } from '../../share/service/session.service';

@Component({
  selector: 'app-student-layout',
  templateUrl: './student-layout.component.html',
  styleUrls: ['./student-layout.component.css']
})
export class StudentLayoutComponent implements OnInit {
  public useraccesdata: any;

  constructor(private router: Router, public session: SessionService) {
  }

  ngOnInit() {
    let useracces = this.session.getData();
    this.useraccesdata = JSON.parse(useracces);
  }
  OnLogout() {
    this.session.logOut();
    this.router.navigate(["/login-student"]);
    return false;
  }
}
