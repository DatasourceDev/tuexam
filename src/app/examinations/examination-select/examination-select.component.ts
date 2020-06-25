import { Component, OnInit } from '@angular/core';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { Router } from '@angular/router';
import { SessionService } from '../../share/service/session.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
import { formatDate, LocationStrategy } from '@angular/common';
import { TranslationService } from 'src/app/share/service/translation.service';

@Component({
  selector: 'app-examination-select',
  templateUrl: './examination-select.component.html',
  styleUrls: ['./examination-select.component.css']
})
export class ExaminationSelectComponent implements OnInit {
  public loading = false;
  private data: any;
  public useraccesdata: any;

  constructor(private translator: TranslationService, private location: LocationStrategy, private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, public session: SessionService) {
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
  }

  ngOnInit() {
    if (!this.session.isFirstTab()) {
      this.router.navigate(["/examination-message"]);
    }
    let useracces = this.session.getData();
    this.useraccesdata = JSON.parse(useracces);

    this.OnSearch();
    this.OnCheckToken();
  }
  OnCheckToken() {
    let token = this.session.getToken();
    let formdata = { token: token, id: this.useraccesdata.studentid };
    this.service.httpClientGet("api/Account/tokenisexist", formdata)
      .subscribe(result => {
        if (result["result"] != 200) {
          this.router.navigate(["/login-student"]);
          Swal.fire({ text: 'session หมดอายุหรือผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        }
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
      });
  }

  OnSearch() {
    var currentDate = formatDate(new Date(), 'dd/MM/yyyy', 'en');

    let formdata = {
      student_search: this.useraccesdata.studentid,
      date_search: currentDate,
    };
    this.loading = true;

    this.service.httpClientGet("api/TestResult/inittestresultstudent", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.data = null;
        }
        else {
          this.data = result;
          let groups = [];
          for (var i = 0; i < this.data.length; i++) {
            var group = this.data[i].group;
            var doexamorder = this.data[i].doexamorder;
            var examingstatus = this.data[i].examingstatus;
            var subject = this.data[i].subject;
            var g = { group: group, doexamorder: doexamorder, examingstatus: [], subject: [] };
            var dup = false;
            for (var j = 0; j < groups.length; j++) {
              if (groups[j].group == group) {
                dup = true;
                groups[j].examingstatus.push(examingstatus);
                groups[j].subject.push(subject);
                break;
              }
            }
            if (dup == false) {
              g.examingstatus.push(examingstatus);
              g.subject.push(subject);
              groups.push(g);
            }
          }

          for (var i = 0; i < groups.length; i++) {
            var allowsubject;
            if (groups[i].doexamorder == true) {
              var allowcnt = 0;
              for (var j = 0; j < groups[i].examingstatus.length; j++) {
                if (groups[i].examingstatus[j] == 0) {
                  if (allowcnt == 0) {
                    allowsubject = groups[i].subject[j];
                  }
                  allowcnt++;
                }
              }
              for (var j = 0; j < this.data.length; j++) {
                if (this.data[j].subject == allowsubject) {
                  this.data[j].allowexam = true;
                }
                else {
                  this.data[j].allowexam = false;
                }
              }
            }
            else {
              for (var j = 0; j < this.data.length; j++) {
                  this.data[j].allowexam = true;
              }
            }
          }
        }
        this.loading = false;

      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;

      });
  }

  OnStart(id) {
    let formdata = {
      id: id
    };
    this.loading = true;
    this.service.httpClientGet("api/TestResult/start", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        }
        else {
          if (result["result"] == 200) {
            this.router.navigate(['/examination/', id, result["index"]]);
          }
          else {
            Swal.fire({ text: result["message"], type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          }
        }
        this.loading = false;
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
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
  translate(key: string): string {
    return this.translator.translate(key);
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
