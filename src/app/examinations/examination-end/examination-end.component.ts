import { Component, OnInit } from '@angular/core';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../share/service/session.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { formatDate, LocationStrategy } from '@angular/common';
import { TranslationService } from 'src/app/share/service/translation.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-examination-end',
  templateUrl: './examination-end.component.html',
  styleUrls: ['./examination-end.component.css']
})
export class ExaminationEndComponent implements OnInit {
  public useraccesdata: any;
  id: string;
  public loading = false;

  group: string;
  subject: string;
  questioncnt: number;
  answeredcnt: number;
  correctcnt: number;
  wrongcnt: number;
  point: number;
  sendtype: string;
  showresult: string;
  description: string;
  sendbyemail: boolean;
  sendbypost: boolean;
  sendother: boolean;
  starton: string;
  endon: string;
  constructor(private translator: TranslationService,private location: LocationStrategy,private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute, public session: SessionService) {
    let useracces = this.session.getData();
    this.useraccesdata = JSON.parse(useracces);
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
   
  }
  
  ngOnInit() {
    if (!this.session.isFirstTab()) {
      this.router.navigate(["/examination-message"]);
    }
    this.OnCheckToken();
    this.id = this.route.snapshot.params['id'];
    let formdata = {
      id: this.id
    };
    this.loading = true;
    this.service.httpClientGet("api/TestResult/gettestresultstudent", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        }
        else {
          if (result["result"] == 200) {
            this.group = result["group"];
            this.subject = result["subject"];
            this.questioncnt = result["questioncnt"];
            this.answeredcnt = result["answeredcnt"];
            this.starton = result["starton"];
            this.endon = result["endon"];
            this.correctcnt = result["correctcnt"];
            this.wrongcnt = result["wrongcnt"];
            this.point = result["point"];          
            this.sendbyemail = result["sendbyemail"];
            this.sendbypost = result["sendbypost"];
            this.sendother = result["other"];

            this.sendtype = this.getsendtype(result["sendbyemail"], result["sendbyemail"], result["other"]);
            this.description = result["description"];
            this.showresult = result["showresult"];
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
  OnLogout() {
    this.session.logOut();
    this.router.navigate(["/login-student"]);
    return false;
  }
  getsendtype(sendbyemail, sendbypost, other) {
    if (sendbyemail == true)
      return "อีเมล";
    else if (sendbypost == true)
      return "ไปรษณีย์";
    else if (other == true)
      return "อื่นๆ";
    return "";
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
