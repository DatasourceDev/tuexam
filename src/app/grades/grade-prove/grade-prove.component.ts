import { Component, OnInit } from '@angular/core';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../share/service/session.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grade-prove',
  templateUrl: './grade-prove.component.html',
  styleUrls: ['./grade-prove.component.css']
})
export class GradeProveComponent implements OnInit {
  public useraccesdata: any;

  public loading = false;
  private data: any;
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
  questionth: string;
  questionen: string;
  questiontype: string;
  answerid: string;
  private answers: any;

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
        Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
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
            this.questionth = result["questionth"];
            this.questionen = result["questionen"];
            this.questiontype = result["questiontype"];
            this.questioncnt = result["questioncnt"];
            this.answerid = result["answerid"];
            this.answers = result["answers"];
            this.answeredcnt = result["answeredcnt"];
            this.tresultstudentid = result["tresultstudentid"];
            this.point = result["point"];
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
  OnBacktoMain() {
    this.router.navigate(['/grade-detail-search/', this.tid]);
  }
  OnBack() {
    if (this.ix > 1) {
      this.ix = Number(this.ix) - 1;
      this.OnContinuous();
    }
    return false;
  }
  OnNext() {
    if (Number(this.ix) + 1 <= this.questioncnt) {
      this.ix = Number(this.ix) + 1;
      this.OnContinuous();
    }
    return false;
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
}
