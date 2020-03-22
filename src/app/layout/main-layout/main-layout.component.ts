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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  public useraccesdata: any;
  public loading = false;

  constructor(private router: Router, public session: SessionService, private service: AppService) {
  }

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

    let formdata = { id: this.useraccesdata.staffid };
    this.loading = true;
    this.service.httpClientGet("api/Account/logout", formdata)
      .subscribe(result => {
        this.loading = false;
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
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

  OnQuestionSearch() {
    this.router.navigate(["/question-search/"]);
    sessionStorage.clear();
    return false;
  }
  OnStudentSearch() {
    this.router.navigate(["/student-search/"]);
    sessionStorage.clear();
    return false;
  }
}
