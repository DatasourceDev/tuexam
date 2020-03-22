import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, Event as NavigationEvent } from '@angular/router';
import { AppService } from '../../share/service/app.service';
import { SessionService } from '../../share/service/session.service';
import Swal from 'sweetalert2';
import { TranslationService } from 'src/app/share/service/translation.service';

@Component({
  selector: 'app-student-layout',
  templateUrl: './student-layout.component.html',
  styleUrls: ['./student-layout.component.css']
})
export class StudentLayoutComponent implements OnInit {
  public useraccesdata: any;
  public loading = false;

  constructor(private translator: TranslationService,private router: Router, public session: SessionService, private service: AppService,) {
  }

  ngOnInit() {
    let useracces = this.session.getData();
    this.useraccesdata = JSON.parse(useracces);
  }
  OnLogout() {
    this.session.logOut();
    this.router.navigate(["/login-student"]);

    let formdata = { id: this.useraccesdata.studentid };
    this.loading = true;
    this.service.httpClientGet("api/Account/logoutstudent", formdata)
      .subscribe(result => {        
        this.loading = false;
      }, error => {
          Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
    return false;
  }

  OnEn() {
    this.translator.setLanguage('en');
    return false;
  }
  OnTh() {
    this.translator.setLanguage('th');
    return false;
  }
}
