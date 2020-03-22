import { Component, OnInit } from '@angular/core';
import { AppService } from "../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../share/data/app.data";
import { Router } from '@angular/router';
import { FormGroup, Validators } from "@angular/forms";
import { SessionService } from '../share/service/session.service';

import Swal from 'sweetalert2'; 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public useraccesdata: any;

  public loading = false;

  private qpendingdata: any;
  qpendingpageno: number = 1;
  qpendingpagelen: number = 0;
  qpendingitemcnt: number = 0;

  private qrejectdata: any;
  qrejectgpageno: number = 1;
  qrejectpagelen: number = 0;
  qrejectitemcnt: number = 0;

  private qapproveddata: any;
  qapprovedpageno: number = 1;
  qapprovedpagelen: number = 0;
  qapproveditemcnt: number = 0;

  private testpendingdata: any;
  testpendingpageno: number = 1;
  testpendingpagelen: number = 0;
  testpendingitemcnt: number = 0;

  private testrejectdata: any;
  testrejectgpageno: number = 1;
  testrejectpagelen: number = 0;
  testrejectitemcnt: number = 0;

  private testapproveddata: any;
  testapprovedpageno: number = 1;
  testapprovedpagelen: number = 0;
  testapproveditemcnt: number = 0;

  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, public session: SessionService) {
    let useracces = this.session.getData();
    this.useraccesdata = JSON.parse(useracces);
  }

  ngOnInit() {
    this.OnTestPendingSearch();
    this.OnTestRejectSearch();
    this.OnTestApprovedSearch();

    this.OnQPendingSearch();
    this.OnQRejectSearch();
    this.OnQApprovedSearch();
  }
  OnTestPendingSearch() {
    this.loading = true;
    let formdata = {
      appr_search: 1,
      pageno: this.testpendingpageno,
    };
    this.service.httpClientGet("api/Test/listtestapprove", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.testpendingdata = null;
          this.testpendingpageno = 0;
        }
        else {
          this.testpendingdata = result["data"];
          this.testpendingpagelen = result["pagelen"];
          this.testpendingitemcnt = result["itemcnt"];
        }
        this.loading = false;
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
  }
  OnTestRejectSearch() {
    this.loading = true;
    let formdata = {
      appr_search: 3,
      pageno: this.testrejectgpageno,
    };
    this.service.httpClientGet("api/Test/listtestapprove", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.testrejectdata = null;
          this.testrejectgpageno = 0;
        }
        else {
          this.testrejectdata = result["data"];
          this.testrejectpagelen = result["pagelen"];
          this.testrejectitemcnt = result["itemcnt"];
        }
        this.loading = false;
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
  }
  OnTestApprovedSearch() {
    this.loading = true;
    let formdata = {
      appr_search: 2,
      pageno: this.testapprovedpageno,
    };
    this.service.httpClientGet("api/Test/listtestapprove", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.testapproveddata = null;
          this.testapprovedpageno = 0;
        }
        else {
          this.testapproveddata = result["data"];
          this.testapprovedpagelen = result["pagelen"];
          this.testapproveditemcnt = result["itemcnt"];
        }
        this.loading = false;
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
  }

  OnTestPendingPageChange(no) {
    if (no < 1)
      no = 1;
    if (no > this.testpendingpagelen)
      no = this.testpendingpagelen;

    this.testpendingpageno = no;
    this.OnTestPendingSearch();
    return false;
  }  
  getTestPendingPaginationArray() {
    var arr = [];
    for (var i = 1; i <= this.testpendingpagelen; i++) {
      arr.push(i);
    }
    return arr;
  }

  OnTestRejectPageChange(no) {
    if (no < 1)
      no = 1;
    if (no > this.testrejectpagelen)
      no = this.testrejectpagelen;

    this.testrejectgpageno = no;
    this.OnTestRejectSearch();
    return false;
  }
  getTestRejectPaginationArray() {
    var arr = [];
    for (var i = 1; i <= this.testrejectpagelen; i++) {
      arr.push(i);
    }
    return arr;
  }

  OnTestApprovedPageChange(no) {
    if (no < 1)
      no = 1;
    if (no > this.testapprovedpagelen)
      no = this.testapprovedpagelen;

    this.testapprovedpageno = no;
    this.OnTestApprovedSearch();
    return false;
  }
  getTestApprovedPaginationArray() {
    var arr = [];
    for (var i = 1; i <= this.testapprovedpagelen; i++) {
      arr.push(i);
    }
    return arr;
  }

  OnQPendingSearch() {
    this.loading = true;
    let formdata = {
      appr_search: 1,
      pageno: this.qpendingpageno,
    };
    this.service.httpClientGet("api/Question/listquestionapprove", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.qpendingdata = null;
          this.qpendingpageno = 0;
        }
        else {
          this.qpendingdata = result["data"];
          this.qpendingpagelen = result["pagelen"];
          this.qpendingitemcnt = result["itemcnt"];
        }
        this.loading = false;
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
  }
  OnQRejectSearch() {
    this.loading = true;
    let formdata = {
      appr_search: 3,
      pageno: this.qrejectgpageno,
    };
    this.service.httpClientGet("api/Question/listquestionapprove", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.qrejectdata = null;
          this.qrejectgpageno = 0;
        }
        else {
          this.qrejectdata = result["data"];
          this.qrejectpagelen = result["pagelen"];
          this.qrejectitemcnt = result["itemcnt"];
        }
        this.loading = false;
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
  }
  OnQApprovedSearch() {
    this.loading = true;
    let formdata = {
      appr_search: 2,
      pageno: this.qapprovedpageno,
    };
    this.service.httpClientGet("api/Question/listquestionapprove", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.qapproveddata = null;
          this.qapprovedpageno = 0;
        }
        else {
          this.qapproveddata = result["data"];
          this.qapprovedpagelen = result["pagelen"];
          this.qapproveditemcnt = result["itemcnt"];
        }
        this.loading = false;
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
  }

  OnQPendingPageChange(no) {
    if (no < 1)
      no = 1;
    if (no > this.qpendingpagelen)
      no = this.qpendingpagelen;

    this.qpendingpageno = no;
    this.OnQPendingSearch();
    return false;
  }
  getQPendingPaginationArray() {
    var arr = [];
    for (var i = 1; i <= this.qpendingpagelen; i++) {
      arr.push(i);
    }
    return arr;
  }

  OnQRejectPageChange(no) {
    if (no < 1)
      no = 1;
    if (no > this.qrejectpagelen)
      no = this.qrejectpagelen;

    this.qrejectgpageno = no;
    this.OnQRejectSearch();
    return false;
  }
  getQRejectPaginationArray() {
    var arr = [];
    for (var i = 1; i <= this.qrejectpagelen; i++) {
      arr.push(i);
    }
    return arr;
  }

  OnQApprovedPageChange(no) {
    if (no < 1)
      no = 1;
    if (no > this.qapprovedpagelen)
      no = this.qapprovedpagelen;

    this.qapprovedpageno = no;
    this.OnQApprovedSearch();
    return false;
  }
  getQApprovedPaginationArray() {
    var arr = [];
    for (var i = 1; i <= this.qapprovedpagelen; i++) {
      arr.push(i);
    }
    return arr;
  }
}
