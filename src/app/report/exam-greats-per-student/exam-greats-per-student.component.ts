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
  selector: 'app-exam-greats-per-student',
  templateUrl: './exam-greats-per-student.component.html',
  styleUrls: ['./exam-greats-per-student.component.css']
})
export class ExamGreatsPerStudentComponent implements OnInit {
  public loading = false;
  private data: any;
  pageno: number = 1;
  pagelen: number = 0;

  SearchFrom: FormGroup;

  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router) {
    let text_search = new FormControl('', Validators.maxLength(1000));
    let from_search = new FormControl('');
    let to_search = new FormControl('');

    this.SearchFrom = new FormGroup({
      text_search: text_search,
      from_search: from_search,
      to_search: to_search,
    });
  }

  ngOnInit() {
    //let formdata = { pageno: this.pageno };
    //this.OnSearch(formdata);
  }
  OnSearch(formdata) {
    this.loading = true;

    this.service.httpClientGet("api/Report/examstudent", formdata)
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
    this.SearchFrom.controls['from_search'].markAsTouched();
    this.SearchFrom.controls['to_search'].markAsTouched();

    if (this.SearchFrom.valid) {

      let formdata = {
        text_search: this.SearchFrom.value.text_search,
        from_search: this.SearchFrom.value.from_search,
        to_search: this.SearchFrom.value.to_search,
        pageno: this.pageno,
      };
      this.OnSearch(formdata);
    }
  }
  OnViewAll(id) {
    this.router.navigate(['/exam-student-all/', id]);
    return false;
  }
  OnViewGREATS(id) {
    this.router.navigate(['/exam-student-greats/', id]);
    return false;
  }
  OnViewBestScore(id) {
    this.service.openurl("api/PdfReport/resultform?student_search=" + id);
    return false;
    //this.router.navigate(['/exam-student-best-score/', id]);
    //return false;
  }

  OnExcel() {
    var from_search = $('#from_search').val();
    var to_search = $('#to_search').val();
    this.SearchFrom.patchValue({ from_search: from_search });
    this.SearchFrom.patchValue({ to_search: to_search });

    this.SearchFrom.controls['text_search'].markAsTouched();
    this.SearchFrom.controls['from_search'].markAsTouched();
    this.SearchFrom.controls['to_search'].markAsTouched();

    if (this.SearchFrom.valid) {
      this.service.openurl("api/ExcelReport/examstudent?text_search=" + this.SearchFrom.value.text_search + "&from_search=" + this.SearchFrom.value.from_search + "&to_search=" + this.SearchFrom.value.to_search);
    }
    return false;
  }

  OnPdf() {
    var from_search = $('#from_search').val();
    var to_search = $('#to_search').val();
    this.SearchFrom.patchValue({ from_search: from_search });
    this.SearchFrom.patchValue({ to_search: to_search });

    this.SearchFrom.controls['text_search'].markAsTouched();
    this.SearchFrom.controls['from_search'].markAsTouched();
    this.SearchFrom.controls['to_search'].markAsTouched();

    if (this.SearchFrom.valid) {
      this.service.openurl("api/PdfReport/examstudent?text_search=" + this.SearchFrom.value.text_search + "&from_search=" + this.SearchFrom.value.from_search + "&to_search=" + this.SearchFrom.value.to_search);
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
