import { Component, OnInit } from '@angular/core';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../share/service/session.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
import { formatDate, LocationStrategy } from '@angular/common';
import { TranslationService } from 'src/app/share/service/translation.service';

declare var $: any;

@Component({
  selector: 'app-examination-send-type',
  templateUrl: './examination-send-type.component.html',
  styleUrls: ['./examination-send-type.component.css']
})
export class ExaminationSendTypeComponent implements OnInit {
  public useraccesdata: any;
  id: string;
  public loading = false;
  group: string;
  groupid: string;
  subject: string;
  subjectid: string;
  examingstatus: string;
  questioncnt: number;
  answeredcnt: number;
  inputForm: FormGroup;

  sendbyemail: boolean;
  sendbypost: boolean;
  sendother: boolean;
  timeremaining: number;

  allowsendbyemail: boolean;
  allowsendbypost: boolean;
  allowother: boolean;
  description: string;

  constructor(private translator: TranslationService, private location: LocationStrategy, private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute, public session: SessionService) {
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
    let useracces = this.session.getData();
    this.useraccesdata = JSON.parse(useracces);

    let email = new FormControl('', [Validators.maxLength(250), Validators.email]);
    let address = new FormControl('', [Validators.maxLength(1000)]);

    this.inputForm = new FormGroup({
      email: email,
      address: address
    });
  }

  ngOnInit() {
    if (!this.session.isFirstTab()) {
      this.router.navigate(["/examination-message"]);
    }
    this.OnCheckToken();
    this.id = this.route.snapshot.params['id'];
    this.OnSearch();


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
    this.loading = true;
    let formdata = {
      id: this.id
    };
    this.service.httpClientGet("api/TestResult/gettestresultstudent", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          this.router.navigate(['/examination-select/']);
        }
        else {
          if (result["result"] == 200) {
            this.inputForm.patchValue({ email: result["email"] });
            this.inputForm.patchValue({ address: result["address"] });

            this.group = result["group"];
            this.groupid = result["groupid"];
            this.subject = result["subject"];
            this.subjectid = result["subjectid"];
            this.questioncnt = result["questioncnt"];
            this.answeredcnt = result["answeredcnt"];
            this.timeremaining = Number(result["timeremaining"]);
            this.examingstatus = result["examingstatus"];
            if (this.examingstatus == "0") {
              //done exam status
              Swal.fire({ text: "ยังไม่เริ่มแบบทดสอบ", type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
              this.router.navigate(['/examination-select/']);
            }
            else if (this.examingstatus == "1") {

            }
            else if (this.examingstatus == "2") {
              //done exam status
              Swal.fire({ text: "สิ้นสุดแบบทดสอบแล้ว", type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
              this.router.navigate(['/examination-select/']);
            }
            this.OnSetupSearch();
          }
          else {
            Swal.fire({ text: result["message"], type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.router.navigate(['/examination-select/']);
          }
        }
        this.loading = false;
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.router.navigate(['/examination-select/']);
        this.loading = false;
      });
  }

  OnSetupSearch() {
    this.loading = true;
    let formdata = {
      group_searh: this.groupid,
      subject_search: this.subjectid,
    };
    this.service.httpClientGet("api/SendResultSetup/getsendresultsetup", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          this.router.navigate(['/examination-select/']);
        }
        else {
          if (result["result"] == 200) {
            this.allowother = result["other"];
            this.allowsendbyemail = result["sendbyemail"];
            this.allowsendbypost = result["sendbypost"];
            this.description = result["description"];
            if (this.allowother == false)
              this.description = "";
          }
          else {
            this.allowother = false;
            this.allowsendbyemail = false;
            this.allowsendbypost = false;
            this.description = "";
          }
          if (this.allowother == true) {
            this.ChooseOnchange('other');
          }
          else if (this.allowsendbyemail == true) {
            this.ChooseOnchange('email');
          }
          else if (this.allowsendbypost == true) {
            this.ChooseOnchange('post');
          }
        }
        this.loading = false;
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.router.navigate(['/examination-select/']);
        this.loading = false;
      });
  }
  OnSubmit() {
    this.inputForm.controls['email'].markAsTouched();
    this.inputForm.controls['address'].markAsTouched();

    this.inputForm.controls['email'].setErrors(null);
    this.inputForm.controls['address'].setErrors(null);
    if (this.allowsendbyemail == true && this.sendbyemail == true && (this.inputForm.value.email == null || this.inputForm.value.email == '')) {
      this.inputForm.controls['email'].setErrors({ 'email': true });
    }
    if (this.allowsendbypost == true && this.sendbypost == true && (this.inputForm.value.address == null || this.inputForm.value.address == '')) {
      this.inputForm.controls['address'].setErrors({ 'incorrect': true });
    }

    if (this.inputForm.valid) {
      if (this.allowsendbypost == false)
        this.sendbypost = false;
      if (this.allowsendbyemail == false)
        this.sendbyemail = false;
      if (this.allowother == false)
        this.sendother = false;
      let formdata = {
        ID: this.id,
        Email: this.inputForm.value.email,
        Address: this.inputForm.value.address,
        SendByEmail: this.sendbyemail,
        SendByPost: this.sendbypost,
        Other: this.sendother,
        Description: this.description,
      };
      this.loading = true;
      this.service.httpClientPost("api/TestResult/sendresult", formdata)
        .subscribe(result => {
          if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
            Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          }
          else {
            if (result["result"] == 200) {
              this.router.navigate(['/examination-end/', this.id]);
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


  }

  OnBack() {
    this.router.navigate(['/examination/', this.id, 1]);
  }

  ChooseOnchange(value) {
    if (value == 'email') {
      $('#divemail').show();
      $('#divpost').hide();
      $('#divother').hide();
      this.sendbyemail = true;
      this.sendbypost = false;
      this.sendother = false;
    }
    else if (value == 'post') {
      $('#divemail').hide();
      $('#divpost').show();
      $('#divother').hide();
      this.sendbyemail = false;
      this.sendbypost = true;
      this.sendother = false;
    }
    else {
      $('#divemail').hide();
      $('#divpost').hide();
      $('#divother').show();
      this.sendbyemail = false;
      this.sendbypost = false;
      this.sendother = true;
    }
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
