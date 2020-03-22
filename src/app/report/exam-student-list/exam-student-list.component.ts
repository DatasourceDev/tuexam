import { Component, OnInit } from '@angular/core';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
declare var $: any;
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-exam-student-list',
  templateUrl: './exam-student-list.component.html',
  styleUrls: ['./exam-student-list.component.css']
})
export class ExamStudentListComponent implements OnInit {
  public loading = false;
  private data: any;
  private repair: any;

  private subject: any;
  private grouplist: any;
  private subjectlist: any;
  private examperiodlist: any;
  subjectcnt: number;
  pageno: number = 1;
  pagelen: number = 0;

  SearchFrom: FormGroup;
  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router) {
    let text_search = new FormControl('', Validators.maxLength(1000));
    let from_search = new FormControl('');
    let to_search = new FormControl('');
    let group_search = new FormControl('');
    let subject_search = new FormControl('');
    let period_search = new FormControl('');

    this.SearchFrom = new FormGroup({
      text_search: text_search,
      from_search: from_search,
      to_search: to_search,
      group_search: group_search,
      subject_search: subject_search  ,
      period_search: period_search
    });
  }

  ngOnInit() {
    this.examperiodlist = this.appdata.getexamperiod();
    this.OnRepair();

    let formdata = { pageno: this.pageno };
    this.OnSearch(formdata);
    this.OnGroupList();
  }
  OnRepair() {
    let formdata = {};
    this.loading = true;
    this.service.httpClientGet("api/TestResult/listrepair", formdata)
      .subscribe(result => {
        this.loading = false;
        this.repair = result;
        for (var i = 0; i < this.repair.length; i++) {
          var item = this.repair[i];
          formdata = {
            ID: item.id,
            Email: item.email,
            Address: item.address,
            SendByEmail: false,
            SendByPost: false,
            Other: true,
          };
          this.service.httpClientPost("api/TestResult/sendresult", formdata)
            .subscribe(result => {
            }, error => {
              Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            });
        }
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
  }
  OnGroupChange() {
    this.OnSujectList();
  }
  OnGroupList() {
    this.SearchFrom.patchValue({ status: "1" });
    this.service.httpClientGet("api/SubjectGroup/listActivegroup", null)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.grouplist = null;
        }
        else {
          this.grouplist = result;
        }
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
      });
  }
  OnSujectList() {
    this.SearchFrom.patchValue({ subject_search: '' });

    let formdata = {
      group_search: this.SearchFrom.value.group_search
    };
    this.service.httpClientGet("api/Subject/listActivesubject", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.subjectlist = null;
        }
        else {
          this.subjectlist = result;
        }
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
      });
  }
  OnSearch(formdata) {
    this.loading = true;

    this.service.httpClientGet("api/Report/examstudentall", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.data = null;
          this.pagelen = 0;
        }
        else {
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
    var from_search = $('#from_search').val();
    var to_search = $('#to_search').val();
    this.SearchFrom.patchValue({ from_search: from_search });
    this.SearchFrom.patchValue({ to_search: to_search });

    this.SearchFrom.controls['text_search'].markAsTouched();
    this.SearchFrom.controls['subject_search'].markAsTouched();
    this.SearchFrom.controls['period_search'].markAsTouched();
    this.SearchFrom.controls['group_search'].markAsTouched();
    this.SearchFrom.controls['from_search'].markAsTouched();
    this.SearchFrom.controls['to_search'].markAsTouched();

    if (this.SearchFrom.valid) {

      let formdata = {
        text_search: this.SearchFrom.value.text_search,
        from_search: this.SearchFrom.value.from_search,
        to_search: this.SearchFrom.value.to_search,
        group_search: this.SearchFrom.value.group_search,
        subject_search: this.SearchFrom.value.subject_search,
        period_search: this.SearchFrom.value.period_search,
        pageno: this.pageno,
      };
      this.OnSearch(formdata);
    }
  }

  OnExcel() {
    var from_search = $('#from_search').val();
    var to_search = $('#to_search').val();
    this.SearchFrom.patchValue({ from_search: from_search });
    this.SearchFrom.patchValue({ to_search: to_search });

    this.SearchFrom.controls['text_search'].markAsTouched();
    this.SearchFrom.controls['subject_search'].markAsTouched();
    this.SearchFrom.controls['period_search'].markAsTouched();
    this.SearchFrom.controls['group_search'].markAsTouched();
    this.SearchFrom.controls['from_search'].markAsTouched();
    this.SearchFrom.controls['to_search'].markAsTouched();

    if (this.SearchFrom.valid) {
      this.service.openurl("api/ExcelReport/examstudentall?group_search=" + this.SearchFrom.value.group_search + "&period_search=" + this.SearchFrom.value.period_search+ "&subject_search=" + this.SearchFrom.value.subject_search+ "&text_search=" + this.SearchFrom.value.text_search + "&from_search=" + this.SearchFrom.value.from_search + "&to_search=" + this.SearchFrom.value.to_search);
    }
    return false;
  }
  OnPdf() {
    var from_search = $('#from_search').val();
    var to_search = $('#to_search').val();
    this.SearchFrom.patchValue({ from_search: from_search });
    this.SearchFrom.patchValue({ to_search: to_search });

    this.SearchFrom.controls['text_search'].markAsTouched();
    this.SearchFrom.controls['subject_search'].markAsTouched();
    this.SearchFrom.controls['period_search'].markAsTouched();
    this.SearchFrom.controls['group_search'].markAsTouched();
    this.SearchFrom.controls['from_search'].markAsTouched();
    this.SearchFrom.controls['to_search'].markAsTouched();

    if (this.SearchFrom.valid) {
      this.service.openurl("api/PdfReport/examstudentall?group_search=" + this.SearchFrom.value.group_search + "&period_search=" + this.SearchFrom.value.period_search + "&subject_search=" + this.SearchFrom.value.subject_search + "&text_search=" + this.SearchFrom.value.text_search + "&from_search=" + this.SearchFrom.value.from_search + "&to_search=" + this.SearchFrom.value.to_search);
    }
    return false;
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
