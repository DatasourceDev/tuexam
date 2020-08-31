import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../share/service/session.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { formatDate, LocationStrategy } from '@angular/common';
import { TranslationService } from 'src/app/share/service/translation.service';

import { PlyrComponent } from 'ngx-plyr';
import Swal from 'sweetalert2';
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/timer";
import "rxjs/add/operator/finally";
import "rxjs/add/operator/takeUntil";
import "rxjs/add/operator/map";
import Plyr from 'plyr';
@Component({
  selector: 'app-examination',
  templateUrl: './examination.component.html',
  styleUrls: ['./examination.component.css']
})
export class ExaminationComponent implements OnInit {
  public useraccesdata: any;

  public loading = false;
  private data: any;
  private answeredindex: any;
  id: string;
  tresultstudentid: string;
  ix: number;
  pid: string;
  pquestionth: string;
  pquestionen: string;
  pfileurl: string;
  pfiletype: string;
  questionth: string;
  questionen: string;
  fileurl: string;
  filetype: string;
  questiontype: string;
  answerid: string; 
  attanswerid: string;
  choice: string;
  tfanswer: boolean;
  questioncnt: number;
  answeredcnt: number;
  textanswer: string;
  private mcanswers: any;
  private attanswers: any;
  private mmanswers: any;

  inputForm: FormGroup;
  uploadForm: FormGroup;

  fileurlanswer: string;
  filenameanswer: string;

  examingstatus: string;
  countdown: string;
  showingexpirepopup: boolean = false;

  @ViewChild(PlyrComponent, { static: true })
  plyr: PlyrComponent;

  player: Plyr;
  videoSources: Plyr.Source[] = [{}];
  videoSources2: Plyr.Source[] = [{}];

  played(event: Plyr.PlyrEvent) {

  }

  play() {
    this.player.play(); // or this.plyr.player.play()
    return false;
  }
  constructor(private translator: TranslationService,private location: LocationStrategy, private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute, public session: SessionService) {
    let useracces = this.session.getData();
    this.useraccesdata = JSON.parse(useracces);
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });

    let textanswer = new FormControl('', [Validators.maxLength(250)]);
    let textansweres = new FormControl('');
    this.inputForm = new FormGroup({
      textanswer: textanswer,
      textansweres: textansweres
    });


    let fileupload = new FormControl();
    let tresultstudentid = new FormControl();
    let update_by = new FormControl('');

    this.uploadForm = new FormGroup({
      fileupload: fileupload,
      update_by: update_by,
      tresultstudentid: tresultstudentid,
    });
  }
 
  ngOnInit() {
    if (!this.session.isFirstTab()) {
      this.router.navigate(["/examination-message"]);
    }
    this.OnCheckToken();

    this.id = this.route.snapshot.params['id'];
    this.ix = this.route.snapshot.params['ix'];

    this.OnSearch();
    this.OnContinuous(); 
  }
  OnCheckToken() {
    let token = this.session.getToken();
    let formdata = { token: token, id: this.useraccesdata.studentid};
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
            this.examingstatus = result["examingstatus"];
            if (this.examingstatus == "0") {
              //done exam status
              Swal.fire({ text: "ยังไม่เริ่มแบบทดสอบ", type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
              this.router.navigate(['/examination-select/']);
            }
            else if (this.examingstatus == "1") {
              this.startCountdownTimer(Number(result["timeremaining"]), this.id);
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
          Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.router.navigate(['/examination-select/']);
        this.loading = false;
      });
  }
  OnContinuous() {
    let formdata = {
      id: this.id,
      ix: this.ix  ,
      displayrandom:true
    };
    this.service.httpClientGet("api/TestResult/con", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        }
        else {
          if (result["result"] == 200) {
            this.pid = result["pid"];
            this.pquestionth = result["pquestionth"];
            this.pquestionen = result["pquestionen"];
            this.questionth = result["questionth"];
            this.questionen = result["questionen"];
            this.questiontype = result["questiontype"];
            this.questioncnt = result["questioncnt"];
            this.answerid = result["answerid"];
            this.attanswerid = result["attanswerid"];
            this.tfanswer = result["tfanswer"];
            this.choice = result["choice"];
            this.mcanswers = result["mcanswers"];  
            this.mmanswers = result["mmanswers"];  
            this.attanswers = result["attanswers"];
            this.textanswer = result["textanswer"];
            this.answeredcnt = result["answeredcnt"];
            this.tresultstudentid = result["tresultstudentid"];
            this.answeredindex = result["answeredindex"];
            this.fileurl = result["fileurl"];
            this.filetype = result["filetype"];
            this.pfileurl = result["pfileurl"];
            this.pfiletype = result["pfiletype"];
            this.filenameanswer = result["filenameanswer"];
            this.fileurlanswer = result["fileurlanswer"];
            this.inputForm.patchValue({ textanswer: result["textanswer"]});
            this.inputForm.patchValue({ textansweres: result["textanswer"]});

            this.videoSources = [
              {
                src: this.pfileurl,
                type: this.pfiletype,
              },
            ];
            this.videoSources2 = [
              {
                src: this.fileurl,
                type: this.filetype,
              },
            ];
          }
          else {
            Swal.fire({ text: result["message"], type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          }
        }
      }, error => {
          Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
      });

    this.OnTimeStamp();
  }
  OnBack() {
    this.OnSaveTextAnswer();
    if (this.ix > 1) {
      this.ix = Number(this.ix) - 1;
      this.OnContinuous();
    }
  }
  OnNext() {
    this.OnSaveTextAnswer();
    if (Number(this.ix) + 1 <= this.questioncnt) {
      this.ix = Number(this.ix) + 1;
      this.OnContinuous();
    }
  }
  OnSaveTextAnswer() {
    if (this.questiontype == "4" || this.questiontype == "5") {
      var textanswer = "";
      if (this.questiontype == "4") {
        textanswer = this.inputForm.value.textanswer;
      }
      else if (this.questiontype == "5") {
        textanswer = this.inputForm.value.textansweres;
      }
      let formdata = {
        id: this.tresultstudentid,
        textanswer: textanswer,
        qtype: this.questiontype
      };
      this.OnAnswer(formdata);
    }
  }
  OnClick(value) {
    let formdata = {
      id: this.tresultstudentid,
      answerid: value,
      qtype: this.questiontype,
    };
    this.OnAnswer(formdata);
  }
  OnAnswer(formdata) {
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
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
      });
  }
  OnSendResult() {
    this.OnSaveTextAnswer();
    this.router.navigate(['/examination-send-type/', this.id]);
  }


  incomingfile(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.uploadForm.get('fileupload').setValue({
          filename: file.name,
          filetype: file.type,
          value: (<string>reader.result).split(',')[1]
        })
      };
    }
  }
  OnFileUpload() {
    if (this.uploadForm.value.fileupload == null || this.uploadForm.value.fileupload == '') {
      Swal.fire({ text: 'กรุณาระบุไฟล์นำเข้า', type: 'warning', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
      return false;
    }
    this.OnUpload();
  }
  OnUpload() {
    this.loading = true;
    this.uploadForm.patchValue({ tresultstudentid: this.tresultstudentid });
    this.uploadForm.patchValue({ update_by: this.useraccesdata.username });
    let data = JSON.stringify(this.uploadForm.value);
    this.service.httpClientFilePost("api/TestResult/fileupload", data)
      .subscribe(result => {
        if (result["result"] == 200) {
          this.fileurlanswer = result["fileurl"];         
          this.filenameanswer = result["filename"];         
          
        }
        this.loading = false;
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
  }

  OnPageChange(no) {
    this.OnSaveTextAnswer();
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
 
  OnTimeStamp() {
    let formdata = {
      id: this.id
    };
    this.service.httpClientGet("api/TestResult/timestamp", formdata)
      .subscribe(result => {         
      }, error => {
          Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
      });
  }
  startCountdownTimer(sec,tsid) {
    const interval = 1000;
    const duration = sec * 1000;
    const stream$ = Observable.timer(0, interval)
      .finally(() => {
        let formdata = { id: tsid };
        this.service.httpClientGet("api/TestResult/gettestresultstudent", formdata)
          .subscribe(result => {
            if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
              Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            }
            else {
              if (result["examingstatus"] != 3) {

                if (this.showingexpirepopup == false) {
                  this.showingexpirepopup = true;
                  Swal.fire({ text: 'หมดเวลาทำแบบทดสอบ', type: 'info', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } }).then((result) => {
                    this.showingexpirepopup = false;
                  });
                }
                this.OnSendResult();
              }
            }
          }, error => {
            Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          });                        
       
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

  getquestion(th, en) {
    if (this.useraccesdata.course == "0") {
      var name = th;
      if (th == null || th == '')
        name = en;
      return name;
    }
    else {
      var name = en;
      if (en == null || en == '')
        name = th;
      return name;
    }
  }
  getanswer(th, en) {
    if (this.useraccesdata.course == "0") {
      var name = th;
      if (th == null || th == '')
        name = en;
      return name;
    }
    else {
      var name = en;
      if (en == null || en == '')
        name = th;
      return name;
    }
  }
  hasquestion(th, en) {
    if (th == null || th == '')
      return false;
    return true;
  }

  checkanswered(item) {
    if (this.answeredindex.indexOf(item) >= 0) {
      return true;
    }
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
