import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-question-analyze',
  templateUrl: './question-analyze.component.html',
  styleUrls: ['./question-analyze.component.css']
})
export class QuestionAnalyzeComponent implements OnInit {

  public loading = false;
  private data: any;
  private statuslist: any;
  private grouplist: any;
  private subjectlist: any;
  private sublist: any;
  private levellist: any;
  private courselist: any;

  SearchFrom: FormGroup;
  pageno: number = 1;
  pagelen: number = 0;
  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute) {
    let text_search = new FormControl('', Validators.maxLength(1000));
    let status_search = new FormControl('');
    let group_search = new FormControl('');
    let subject_search = new FormControl('');
    let course_search = new FormControl('');
    let sub_search = new FormControl('');
    let level_search = new FormControl('');

    this.SearchFrom = new FormGroup({
      text_search: text_search,
      status_search: status_search,
      group_search: group_search,
      subject_search: subject_search,
      sub_search: sub_search,
      level_search: level_search,
      course_search: course_search
    });
  }
  ngOnInit() {
    let formdata = { pageno: this.pageno };
    this.OnSearch(formdata);
    this.statuslist = this.appdata.getstatus();
    this.levellist = this.appdata.getlevel();
    this.courselist = this.appdata.getcourse();
    this.OnGroupList();
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
  OnSubjectChange() {
    this.OnSubList();
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
  OnSubList() {
    this.SearchFrom.patchValue({ sub_search: '' });

    let formdata = {
      subject_search: this.SearchFrom.value.subject_search
    };
    this.service.httpClientGet("api/SubjectSub/listActivesub", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.sublist = null;
        }
        else {
          this.sublist = result;
        }
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
      });
  }

  OnSearch(formdata) {
    this.loading = true;

    this.service.httpClientGet("api/Report/questionanalyze", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.data = null;
        }
        else {

          this.data = result["data"];
        }
        this.loading = false;
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });

  }
  OnSubmit() {
    let formdata = {
      text_search: this.SearchFrom.value.text_search,
      status_search: this.SearchFrom.value.status_search,
      group_search: this.SearchFrom.value.group_search,
      subject_search: this.SearchFrom.value.subject_search,
      course_search: this.SearchFrom.value.course_search,
      sub_search: this.SearchFrom.value.sub_search,
      level_search: this.SearchFrom.value.level_search,    
      pageno: this.pageno,
    };
    this.OnSearch(formdata);
  }
  OnExcel() {  
    this.service.openurl("api/ExcelReport/questionanalyze?group_search=" + this.SearchFrom.value.group_search +
      "&subject_search=" + this.SearchFrom.value.subject_search +
      "&sub_search=" + this.SearchFrom.value.sub_search +
      "&text_search=" + this.SearchFrom.value.text_search +
      "&status_search=" + this.SearchFrom.value.status_search +
      "&course_search=" + this.SearchFrom.value.course_search +
      "&level_search=" + this.SearchFrom.value.level_search);
    
    return false;
  }
  OnPdf() {
    this.service.openurl("api/PdfReport/questionanalyze?group_search=" + this.SearchFrom.value.group_search +
      "&subject_search=" + this.SearchFrom.value.subject_search +
      "&sub_search=" + this.SearchFrom.value.sub_search +
      "&text_search=" + this.SearchFrom.value.text_search +
      "&status_search=" + this.SearchFrom.value.status_search +
      "&course_search=" + this.SearchFrom.value.course_search +
      "&level_search=" + this.SearchFrom.value.level_search);   
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
  getquestion(th, en) {
    var name = th;
    if (th == null || th == '')
      name = en;
    return this.service.convert_html_to_string(name, 20);
  }
}
