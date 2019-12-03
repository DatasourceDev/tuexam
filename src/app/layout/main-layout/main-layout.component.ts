import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, Event as NavigationEvent } from '@angular/router';
import { AppService } from '../../share/service/app.service';
import { SessionService } from '../../share/service/session.service';

declare var setup_horizontal_menu: any;
declare var setup_date_picker: any;
declare var setup_select2: any;
//declare var setup_summernote: any;   
declare var cbr_replace: any;
declare var select2: any;
declare var $: any;

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  public useraccesdata: any;

  constructor(private router: Router, public session: SessionService) { }

  ngOnInit() {
    setup_horizontal_menu();
    setup_date_picker();
    setup_select2();
    //setup_summernote();
    cbr_replace();

    let useracces = this.session.getData();
    this.useraccesdata = JSON.parse(useracces);
  }
  OnLogout() {
    this.session.logOut();
    this.router.navigate(["/login"]);
    return false;
  }

  OnProfile() {
    this.router.navigate(["/staff/" + this.useraccesdata.staffid]);
    return false;
  }
  OnReset() {
    this.router.navigate(["/reset-password/" + this.useraccesdata.staffid]);
    return false;
  }
}
