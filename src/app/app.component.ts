import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, Event as NavigationEvent } from '@angular/router';
import { AppService } from './share/service/app.service';
import { SessionService } from './share/service/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tuexam';
  constructor(private router: Router, public session: SessionService) {
    router.events.forEach((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {
        var url = event.url;
        var routing = url.split("/");
        if (this.session.isLoggedIn()) {
          let useracces = this.session.getData();
          let useraccesdata = JSON.parse(useracces);
          if (useraccesdata.staffid != null) {
            /*staff login*/
            if (routing[1].indexOf("examination") >= 0) {
              this.router.navigate(["/login-student"]);
            }
          }
          else if (useraccesdata.studentid != null) {
            /*student login*/
            if (routing[1].indexOf("examination") < 0) {
              this.router.navigate(["/login"]);
            }
          }
        }
        else {
          if (routing[1] == "login-student") {
          }
          if (routing[1].indexOf("examination") >= 0) {
            this.router.navigate(["/login-student"]);
          }
          else {
            this.router.navigate(["/login"]);
          }
        }
      }
    });
  }
}
