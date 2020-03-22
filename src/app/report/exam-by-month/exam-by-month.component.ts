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
  selector: 'app-exam-by-month',
  templateUrl: './exam-by-month.component.html',
  styleUrls: ['./exam-by-month.component.css']
})
export class ExamByMonthComponent implements OnInit {

  public loading = false;
  private data: any;
  private subject: any;
  private grouplist: any;
  private yearlist: any;
  subjectcnt: number;
  pageno: number = 1;
  pagelen: number = 0;

  SearchFrom: FormGroup;
  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router) {
    let from_search = new FormControl('', Validators.required);
    let to_search = new FormControl('', Validators.required);
    let group_search = new FormControl('', Validators.required);

    this.SearchFrom = new FormGroup({
      from_search: from_search,
      to_search: to_search,
      group_search: group_search,
    });
  }


  ngOnInit() {
    this.OnGroupList();
    this.SetDate();
  }
  SetDate() {
    var currentDate = formatDate(new Date(), 'dd/MM/yyyy', 'en');   
    var curyear = (new Date()).getFullYear();
    var year = 2020;

    var list = [];
    for (var i = curyear; i <= curyear; i++) {
      list.push({ value: i, text: i });
    }
    this.yearlist = list;

    this.SearchFrom.patchValue({ from_search: curyear });
    this.SearchFrom.patchValue({ to_search: curyear });
  }
  OnGroupList() {
    this.service.httpClientGet("api/SubjectGroup/listActivegroup", null)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.grouplist = null;
        }
        else {
          this.grouplist = result;
          if (this.grouplist.length > 0)
            this.SearchFrom.patchValue({ group_search: this.grouplist[0].id });
        }
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
      });
  }
  OnSearch(formdata) {
    this.loading = true;

    this.service.httpClientGet("api/Report/exambymonth", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.data = null;
          this.pagelen = 0;
        }
        else {
          this.data = result["data"];
          this.subject = result["subject"];
          this.subjectcnt = result["subjectcnt"];
          this.pagelen = result["pagelen"];
        }
        this.loading = false;
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
  }
  OnSubmit() {
    this.SearchFrom.controls['group_search'].markAsTouched();
    this.SearchFrom.controls['from_search'].markAsTouched();
    this.SearchFrom.controls['to_search'].markAsTouched();

    if (this.SearchFrom.valid) {

      let formdata = {
        from_search: this.SearchFrom.value.from_search,
        to_search: this.SearchFrom.value.to_search,
        group_search: this.SearchFrom.value.group_search,
        pageno: this.pageno,
      };
      this.OnSearch(formdata);
    }
  }
  OnExcel() {
    this.SearchFrom.controls['group_search'].markAsTouched();
    this.SearchFrom.controls['from_search'].markAsTouched();
    this.SearchFrom.controls['to_search'].markAsTouched();

    if (this.SearchFrom.valid) {
      this.service.openurl("api/ExcelReport/exambymonth?group_search=" + this.SearchFrom.value.group_search + "&from_search=" + this.SearchFrom.value.from_search + "&to_search=" + this.SearchFrom.value.to_search);
    }
    return false;
  }
  OnPdf() {
    this.SearchFrom.controls['group_search'].markAsTouched();
    this.SearchFrom.controls['from_search'].markAsTouched();
    this.SearchFrom.controls['to_search'].markAsTouched();

    if (this.SearchFrom.valid) {
      this.service.openurl("api/PdfReport/exambymonth?group_search=" + this.SearchFrom.value.group_search + "&from_search=" + this.SearchFrom.value.from_search + "&to_search=" + this.SearchFrom.value.to_search);
    }
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

}
