import { Component, OnInit } from '@angular/core';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../share/service/session.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/timer";
import "rxjs/add/operator/finally";
import "rxjs/add/operator/takeUntil";
import "rxjs/add/operator/map";

@Component({
  selector: 'app-examination',
  templateUrl: './examination.component.html',
  styleUrls: ['./examination.component.css']
})
export class ExaminationComponent implements OnInit {
  public useraccesdata: any;

  public loading = false;
  private data: any;
  id: string;
  tresultstudentid: string;
  ix: number;
  questionth: string;
  questionen: string;
  questiontype: string;
  answerid: string;
  questioncnt: number;
  answeredcnt: number;
  private answers: any;

  examingstatus: string;
  countdown: string;
  showingexpirepopup: boolean = false;
  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute, public session: SessionService) {
    let useracces = this.session.getData();
    this.useraccesdata = JSON.parse(useracces);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.ix = this.route.snapshot.params['ix'];

    this.OnSearch();
    this.OnContinuous();
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
            this.examingstatus = result["examingstatus"];
            if (this.examingstatus == "0") {
              //done exam status
              Swal.fire({ text: "ยังไม่เริ่มแบบทดสอบ", type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
              this.router.navigate(['/examination-select/']);
            }
            else if (this.examingstatus == "1") {
              this.startCountdownTimer(Number(result["timeremaining"]));
              if (Number(result["timeremaining"]) <= 0) {
                if (this.showingexpirepopup == false) {
                  this.showingexpirepopup = true;
                  Swal.fire({ text: 'หมดเวลาทำแบบทดสอบ', type: 'info', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } }).then((result) => {
                    this.showingexpirepopup = false;
                  });
                }
                this.OnSendResult();
              }
            }
            else if (this.examingstatus == "2") {
              //done exam status
              Swal.fire({ text: "สิ้นสุดแบบทดสอบแล้ว", type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
              this.router.navigate(['/examination-select/']);
            }
            
          }
          else {
            Swal.fire({ text: result["message"], type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.router.navigate(['/examination-select/']);
          }
        }
        this.loading = false;
      }, error => {
        Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.router.navigate(['/examination-select/']);
        this.loading = false;
      });
  }
  OnContinuous() {
    this.loading = true;
    let formdata = {
      id: this.id,
      ix: this.ix
    };
    this.service.httpClientGet("api/TestResult/con", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        }
        else {
          if (result["result"] == 200) {
            this.questionth = result["questionth"];
            this.questionen = result["questionen"];
            this.questiontype = result["questiontype"];
            this.questioncnt = result["questioncnt"];
            this.answerid = result["answerid"];
            this.answers = result["answers"];
            this.answeredcnt = result["answeredcnt"];
            this.tresultstudentid = result["tresultstudentid"];
          }
          else {
            Swal.fire({ text: result["message"], type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          }
        }
        this.loading = false;
      }, error => {
        Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });

    this.OnTimeStamp();
  }
  OnBack() {
    if (this.ix > 1) {
      this.ix = Number(this.ix) - 1;
      this.OnContinuous();
    }
  }
  OnNext() {
    if (Number(this.ix) + 1 <= this.questioncnt) {
      this.ix = Number(this.ix) + 1;
      this.OnContinuous();
    }
  }

  OnPageChange(no) {
    this.ix = no;
    this.OnContinuous();
    return false;
  }

  getPaginationArray() {
    var arr = [];
    for (var i = 1; i <= this.questioncnt; i++) {
      arr.push(i);
    }
    return arr;
  }
  OnClick(value) {
    this.loading = true;
    let formdata = {
      id: this.tresultstudentid,
      answerid: value
    };
    this.service.httpClientGet("api/TestResult/answer", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        }
        else {
          if (result["result"] == 200) {
            this.OnContinuous();
          }
          else {
            Swal.fire({ text: result["message"], type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          }
        }
        this.loading = false;
      }, error => {
        Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
  }

  OnSendResult() {
    this.router.navigate(['/examination-send-type/', this.id]);
  }
  OnTimeStamp() {
    let formdata = {
      id: this.id
    };
    this.service.httpClientGet("api/TestResult/timestamp", formdata)
      .subscribe(result => {         
        this.loading = false;
      }, error => {
        Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
  }
  startCountdownTimer(sec) {
    const interval = 1000;
    const duration = sec * 1000;
    const stream$ = Observable.timer(0, interval)
      .finally(() => {
        if (this.showingexpirepopup == false) {
          this.showingexpirepopup = true;
          Swal.fire({ text: 'หมดเวลาทำแบบทดสอบ', type: 'info', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } }).then((result) => {
            this.showingexpirepopup = false;
          });
        }
        this.OnSendResult();
      })
      .takeUntil(Observable.timer(duration + interval))
      .map(value => duration - value * interval);
    stream$.subscribe(value => {
      
      this.countdown = this.secondtomin(value / 1000);
    });
  }

  secondtomin(time) {
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;
    return minutes + ":" + this.strpadleft(seconds, '0', 2);
  }

  strpadleft(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  }
}
