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
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  public loading = false;
  private data: any;
  private testresultdata: any;
  private examtesttypelist: any;
  private examperiodlist: any;
  private testlist: any;
  private grouplist: any;
  private subjectlist: any;

  id: string;
  examperiodname: string;
  group: string;
  subject: string;
  examtesttypename: string;
  test: string;

  inputForm: FormGroup;

  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute) {
    let examdate = new FormControl('', Validators.required);
    let groupid = new FormControl('', Validators.required);
    let subjectid = new FormControl('', Validators.required);
    let examperiod = new FormControl('', Validators.required);
    let examtesttype = new FormControl('', Validators.required);
    let testid = new FormControl('');

    this.inputForm = new FormGroup({
      examdate: examdate,
      groupid: groupid,
      subjectid: subjectid,
      examperiod: examperiod,
      examtesttype: examtesttype,
      testid: testid,
    });

  }

  ngOnInit() {
    var currentDate = formatDate(new Date(), 'dd/MM/yyyy', 'en');

    this.id = this.route.snapshot.params['id'];

    this.examtesttypelist = this.appdata.gettestquestiontype();
    this.examperiodlist = this.appdata.getexamperiod();

    this.inputForm.patchValue({ examtesttype: "0" });
    this.inputForm.patchValue({ examperiod: "0" });
    this.inputForm.patchValue({ examdate: currentDate });

    if (this.id != null && parseInt(this.id) > 0) {

      this.loading = true;
      let formdata = { id: this.id };
      this.service.httpClientGet("api/Exam/getexam", formdata)
        .subscribe(result => {
          if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
            Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.router.navigate(['/exam-search/']);
            this.loading = false;
          }
          else {
            if (result["result"] == -101) {
              Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
              this.router.navigate(['/exam-search/']);
            }
            else {
              this.data = result;
              this.inputForm.patchValue({ examdate: this.data.examdate });
              this.inputForm.patchValue({ groupid: this.data.groupid });
              this.inputForm.patchValue({ subjectid: this.data.subjectid });
              this.inputForm.patchValue({ examperiod: this.data.examperiod });
              this.inputForm.patchValue({ examtesttype: this.data.examtesttype });
              this.inputForm.patchValue({ testid: this.data.testid });
              this.examperiodname = this.data.examperiodname;
              this.group = this.data.group;
              this.subject = this.data.subject;
              this.examtesttypename = this.data.examtesttypename;
              this.test = this.data.test;

              this.OnGroupList(false);
              this.OnSujectList(false);
              this.ExamTypeOnchange();
            }
            this.loading = false;

          }
        }, error => {
          this.loading = false;
        });
    }
    else {
      this.OnGroupList(true);
      this.ExamTypeOnchange();
    }

  }
  OnGroupChange() {
    this.OnSujectList(false);
    this.inputForm.patchValue({ subjectid: '' });
    this.OnTestList();
  }
  OnSubjectChange() {
    this.OnTestList();
  }
  OnGroupList(setdefault) {
    this.service.httpClientGet("api/SubjectGroup/listActivegroup", null)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.grouplist = null;
        }
        else {
          this.grouplist = result;
          if (setdefault == true) {
            if (this.grouplist != null && this.grouplist.length > 0) {
              var group = this.grouplist[0];
              this.inputForm.patchValue({ groupid: group.id });
              this.OnSujectList(setdefault);
            }
          }
        }
      }, error => {
      });
  }
  OnSujectList(setdefault) {
    let formdata = {
      group_search: this.inputForm.value.groupid
    };
    this.service.httpClientGet("api/Subject/listActivesubject", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.subjectlist = null;
        }
        else {
          this.subjectlist = result;
          if (setdefault == true) {
            if (this.subjectlist != null && this.subjectlist.length > 0) {
              var subject = this.subjectlist[0];
              this.inputForm.patchValue({ subjectid: subject.id });
            }
          }

        }
      }, error => {

      });
  }
  OnTestList() {
    let formdata = {
      group_search: this.inputForm.value.groupid,
      subject_search: this.inputForm.value.subjectid
    };
    this.service.httpClientGet("api/Test/listActivetest", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.testlist = null;
        }
        else {
          this.testlist = result;

        }
      }, error => {
      });
  }
  OnSubmit() {
    var examdate = $('#examdate').val();
    this.inputForm.patchValue({ examdate: examdate });

    this.inputForm.controls['examdate'].markAsTouched();
    this.inputForm.controls['examperiod'].markAsTouched();
    this.inputForm.controls['groupid'].markAsTouched();
    this.inputForm.controls['subjectid'].markAsTouched();
    this.inputForm.controls['examtesttype'].markAsTouched();
    this.inputForm.controls['testid'].markAsTouched();

    this.inputForm.controls['testid'].setErrors(null);
    if (this.inputForm.value.examtesttype == "1" && (this.inputForm.value.testid == null || this.inputForm.value.testid == '')) {
      this.inputForm.controls['testid'].setErrors({ 'incorrect': true });
    }

    if (this.inputForm.valid) {
      let formdata = {
        ID: this.id,
        ExamDate: this.inputForm.value.examdate,
        ExamPeriod: this.inputForm.value.examperiod,
        SubjectGroupID: this.inputForm.value.groupid,
        SubjectID: this.inputForm.value.subjectid,
        ExamTestType: this.inputForm.value.examtesttype,
        testid: this.inputForm.value.testid,
      };
      this.loading = true;
      if (this.id != null && parseInt(this.id) > 0) {
        this.service.httpClientPost("api/Exam/update", formdata)
          .subscribe(result => {
            if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
              Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            }
            else {
              if (result["result"] == 200) {
                this.router.navigate(['/exam-search/']);
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
      else {
        this.service.httpClientPost("api/Exam/insert", formdata)
          .subscribe(result => {
            if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
              Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            }
            else {
              if (result["result"] == 200) {
                this.router.navigate(['/exam-search/']);
              }
              else {
                Swal.fire({ text: result["message"], type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
              };
            }
            this.loading = false;
          }, error => {
            Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.loading = false;
          });
      }
    }
  }
  ExamTypeOnchange() {
    if (this.inputForm.value.examtesttype == '0') {
      $('#divcustom').hide();
      $('#divrandom').show();
    }
    else {
      $('#divrandom').hide();
      $('#divcustom').show();
      this.OnTestList();
    }
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
