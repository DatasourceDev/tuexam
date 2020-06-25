import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-exam-student-greats',
  templateUrl: './exam-student-greats.component.html',
  styleUrls: ['./exam-student-greats.component.css']
})
export class ExamStudentGreatsComponent implements OnInit {

  public loading = false;
  private data: any;
  pageno: number = 1;
  pagelen: number = 0;
  id: string;
  prefix: string;
  firstname: string;
  lastname: string;
  firstnameen: string;
  lastnameen: string;
  studentcode: string;
  course: string;
  faculty: string;

  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    let formdata = { pageno: this.pageno, student_search: this.id, greats:true };
    this.OnSearch(formdata);
  }
  OnSearch(formdata) {
    this.loading = true;

    this.service.httpClientGet("api/Report/examstudentform", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.data = null;
          this.pagelen = 0;
        }
        else {
          this.prefix = result["prefix"];
          this.firstname = result["firstname"];
          this.lastname = result["lastname"];
          this.firstnameen = result["firstnameen"];
          this.lastnameen = result["lastnameen"];
          this.studentcode = result["studentcode"];
          this.course = result["course"];
          this.faculty = result["faculty"];
          this.data = result["data"];
          this.pagelen = result["pagelen"];
          
        }
        this.loading = false;
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });

  }
  OnSubmit() {
    let formdata = {
      pageno: this.pageno,
    };
    this.OnSearch(formdata);
  }
  OnPdf() {
    var choose = '';
    for (var i = 0; i < $('.chk').length; i++) {
      if ($('.chk').get(i).checked == true) {
        choose += $('.chk').get(i).value + ',';
      }
    }
    this.service.openurl("api/PdfReport/resultform?student_search=" + this.id + "&greats=true"  + "&tsresult=" + choose );
    //this.service.openurl("api/PdfReport/examstudentform?student_search=" + this.id);
    return false;
  }
  OnPageChange(no) {
    if (no < 1)
      no = 1;
    if (no > this.pagelen)
      no = this.pagelen;

    this.pageno = no;
    this.OnSubmit();
    return false;
  }

  getPaginationArray() {
    var arr = [];
    for (var i = 1; i <= this.pagelen; i++) {
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
  OnCheckAll() {
    if ($('#chkall').get(0).checked == true) {
      for (var i = 0; i < $('.chk').length; i++) {
        $('.chk').get(i).checked = true;
      }
    }
    else {
      for (var i = 0; i < $('.chk').length; i++) {
        $('.chk').get(i).checked = false;
      }
    }
  }
}
