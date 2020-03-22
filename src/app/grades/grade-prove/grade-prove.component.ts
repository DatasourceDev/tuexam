import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../share/service/session.service';
import { TranslationService } from '../../share/service/translation.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PlyrComponent } from 'ngx-plyr';
import Swal from 'sweetalert2';
import Plyr from 'plyr';
@Component({
  selector: 'app-grade-prove',
  templateUrl: './grade-prove.component.html',
  styleUrls: ['./grade-prove.component.css']
})
export class GradeProveComponent implements OnInit {
  public useraccesdata: any;

  public loading = false;
  private data: any;
  private answeredindex: any; 
  private provedindex: any; 

  id: string;
  tid: string;
  ix: number;
  questioncnt: number;
  prefix: string;
  firstname: string;
  lastname: string;
  fistnameen: string;
  lastnameen: string;
  answeredcnt: number;
  point: number;
  totalpoint: number;
  tresultstudentid: string;
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
  textanswer: string;
  provestatus: string;
  private mcanswers: any;
  private attanswers: any;
  private mmanswers: any;

  inputForm: FormGroup;

  fileurlanswer: string;
  filenameanswer: string;

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

  constructor(private translator: TranslationService,private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute, public session: SessionService) {
    let useracces = this.session.getData();
    this.useraccesdata = JSON.parse(useracces);

    let pointanswer = new FormControl('');
    let pointansweres = new FormControl('');
    let pointansweras = new FormControl('');
    this.inputForm = new FormGroup({
      pointanswer: pointanswer  ,
      pointansweres: pointansweres,
      pointansweras: pointansweras,
    });
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
          this.router.navigate(['/grade-detail-search/', this.id]);
        }
        else {
          if (result["result"] == 200) {
            this.questioncnt = result["questioncnt"];
            this.prefix = result["prefix"];
            this.firstname = result["firstname"];
            this.lastname = result["lastname"];
            this.fistnameen = result["fistnameen"];
            this.lastnameen = result["lastnameen"];
            this.answeredcnt = result["answeredcnt"];
            this.totalpoint = result["point"];
            this.tid = result["tid"];
          }
          else {
            Swal.fire({ text: result["message"], type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.router.navigate(['/grade-detail-search/', this.id]);
          }
        }
        this.loading = false;
      }, error => {
          Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          this.router.navigate(['/grade-detail-search/', this.id]);
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
            this.textanswer = result["textanswer"];
            this.choice = result["choice"];
            this.mcanswers = result["mcanswers"];
            this.attanswers = result["attanswers"];
            this.mmanswers = result["mmanswers"];
            this.answeredcnt = result["answeredcnt"];
            this.tresultstudentid = result["tresultstudentid"];
            this.point = result["point"];
            this.answeredindex = result["answeredindex"];
            this.provedindex = result["provedindex"];

            this.fileurl = result["fileurl"];
            this.filetype = result["filetype"];
            this.pfileurl = result["pfileurl"];
            this.pfiletype = result["pfiletype"];
            this.filenameanswer = result["filenameanswer"];
            this.fileurlanswer = result["fileurlanswer"];
            this.provestatus = result["provestatus"];
            this.inputForm.patchValue({ pointanswer: result["point"] });
            this.inputForm.patchValue({ pointansweres: result["point"] });
            this.inputForm.patchValue({ pointansweras: result["point"] });
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
        this.loading = false;
      }, error => {
          Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });    
  }

  OnBacktoMain() {
    this.OnSavePointAnswer();
    this.router.navigate(['/grade-detail-search/', this.tid]);
  }
  OnBack() {
    this.OnSavePointAnswer();
    if (this.ix > 1) {
      this.ix = Number(this.ix) - 1;
      this.OnContinuous();
    }
    return false;
  }
  OnNext() {
    this.OnSavePointAnswer();
    if (Number(this.ix) + 1 <= this.questioncnt) {
      this.ix = Number(this.ix) + 1;
      this.OnContinuous();
    }
    return false;
  }
  OnSavePointAnswer() {
    if (this.questiontype == "4" || this.questiontype == "5" || this.questiontype == "6") {
      var pointanswer = "";
      if (this.questiontype == "4") {
        pointanswer = this.inputForm.value.pointanswer;
      }
      else if (this.questiontype == "5") {
        pointanswer = this.inputForm.value.pointansweres;
      }
      else if (this.questiontype == "6") {
        pointanswer = this.inputForm.value.pointansweras;
      }
      let formdata = {
        id: this.tresultstudentid,
        pointanswer: pointanswer,
        qtype: this.questiontype
      };
      this.service.httpClientGet("api/TestResult/pointanswer", formdata)
        .subscribe(result => {
          if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
            Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          }
          else {
            if (result["result"] == 200) {
              this.totalpoint = result["totalpoint"];
            }
            else {
              Swal.fire({ text: result["message"], type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            }
          }
        }, error => {
          Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        });
    }
  }
  OnPageChange(no) {
    this.OnSavePointAnswer();
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

  getStudentName(prefix, firstname, lastname, firstnameen, lastnameen) {
    var name = prefix;
    if (firstname != null && firstname != "")
      name += " " + firstname;
    else if (firstnameen != null && firstnameen != "")
      name += " " + firstnameen;

    if (lastname != null && lastname != "")
      name += " " + lastname;
    else if (lastnameen != null && lastnameen != "")
      name += " " + lastnameen;

    return name;
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
  checkproved(item) {
    if (this.provedindex.indexOf(item) >= 0) {
      return true;
    }
    return false;
  }

  translate(key: string): string {
    return this.translator.translate(key);
  }

  convertpoint(point) {
    if (point == null)
      return 0;
    else
      return point;
  }

  OnEn() {
    this.translator.setLanguage('en');
    return false;
  }
  OnTh() {
    this.translator.setLanguage('th');
    return false;
  }

  OnOpenFile() {
    window.open(this.fileurlanswer, '_blank');
    return false;
  }

}
