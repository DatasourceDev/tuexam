import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { formatDate } from '@angular/common';

import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-grade-detail-search',
  templateUrl: './grade-detail-search.component.html',
  styleUrls: ['./grade-detail-search.component.css']
})
export class GradeDetailSearchComponent implements OnInit {
  public loading = false;
  private data: any;
  private statuslist: any;
  private grouplist: any;
  private subjectlist: any;

  pageno: number = 1;
  pagelen: number = 0;

  id: string;
  group: string;
  subject: string;
  examid: string;
  examdate: string;
  examperiod: string;
  registercnt: number;
  examregistercnt: number;
  provedcnt: number;
  unprovedcnt: number;

  SearchFrom: FormGroup;

  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute) {
    let text_search = new FormControl('', Validators.maxLength(1000));
    let status_search = new FormControl('');

    this.SearchFrom = new FormGroup({
      text_search: text_search,
      status_search: status_search
    });
  }


  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.statuslist = this.appdata.getgradestatus();

    if (this.id != null && parseInt(this.id) > 0) {

      this.loading = true;
      let formdata = { id: this.id };
      this.service.httpClientGet("api/TestResult/gettestresult", formdata)
        .subscribe(result => {
          if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
            Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.router.navigate(['/grade-search/']);
            this.loading = false;
          }
          else {
            if (result["result"] == 200) {
              this.group = result["group"];
              this.subject = result["subject"];
              this.examid = result["examid"];
              this.examdate = result["examdate"];
              this.examperiod = result["examperiod"];
              this.registercnt = result["registercnt"];
              this.examregistercnt = result["examregistercnt"];
              this.provedcnt = result["provedcnt"];
              this.unprovedcnt = result["unprovedcnt"];

              formdata = { id: this.examid };
              this.OnSearch(formdata);
            }
            else {
              Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
              this.router.navigate(['/grade-search/']);
            }
            this.loading = false;

          }
        }, error => {
            Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          this.loading = false;
        });
    }
  }
  OnSearch(formdata) {
    this.loading = true;
    this.service.httpClientGet("api/TestResult/listtestresultstudent", formdata)
      .subscribe(result => {
        this.data = result;
        this.loading = false;
      }, error => {
          Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
  }
  OnSubmit() {
    let formdata = {
      id: this.examid ,
      text_search: this.SearchFrom.value.text_search,
      status_search: this.SearchFrom.value.status_search,
    };
    this.OnSearch(formdata);
  }

  OnProve(id) {
    this.router.navigate(['/grade-prove/', id,1]);
  }

  OnPdf(id) {
    this.service.openurl("api/PdfReport/resultform?tsresult_search=" + id);
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
  getsendtype(sendbyemail, sendbypost, other) {
    if (sendbyemail == true)
      return "อีเมล";
    else if (sendbypost == true)
      return "ไปรษณีย์";
    else if (other == true)
      return "อื่นๆ";
    return "";
  }
}
