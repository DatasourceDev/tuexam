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
  selector: 'app-grade-search',
  templateUrl: './grade-search.component.html',
  styleUrls: ['./grade-search.component.css']
})
export class GradeSearchComponent implements OnInit {

  public loading = false;
  private data: any;
  private repair: any;

  private statuslist: any;
  private grouplist: any;
  private subjectlist: any;

  pageno: number = 1;
  pagelen: number = 0;

  SearchFrom: FormGroup;

  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router) {
    let text_search = new FormControl('', Validators.maxLength(1000));
    let from_search = new FormControl('');
    let to_search = new FormControl('');
    let group_search = new FormControl('');
    let subject_search = new FormControl('');
    let status_search = new FormControl('');

    this.SearchFrom = new FormGroup({
      text_search: text_search,
      from_search: from_search,
      to_search: to_search,
      group_search: group_search,
      subject_search: subject_search,
      status_search: status_search,
    });
  }


  ngOnInit() {
    let formdata = { pageno: this.pageno };
    this.OnRepair();
    this.OnSearch(formdata);
    this.statuslist = this.appdata.getgradestatus();

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

    this.service.httpClientGet("api/TestResult/listtestresult", formdata)
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

    let formdata = {
      text_search: this.SearchFrom.value.text_search,
      from_search: this.SearchFrom.value.from_search,
      to_search: this.SearchFrom.value.to_search,
      group_search: this.SearchFrom.value.group_search,
      subject_search: this.SearchFrom.value.subject_search,
      status_search: this.SearchFrom.value.status_search,
      pageno: this.pageno,
    };
    this.OnSearch(formdata);
  }

  OnEdit(id) {
    this.router.navigate(['/grade-detail-search/', id]);
  }

}
