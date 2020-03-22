import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
declare var $: any;
declare var setup_ckeditor: any;
@Component({
  selector: 'app-mm-sub-question',
  templateUrl: './mm-sub-question.component.html',
  styleUrls: ['./mm-sub-question.component.css']
})

export class MmSubQuestionComponent implements OnInit {
  public loading = false;
  private data: any;
  private choicelist: any;

  id: string;
  qid: string;
  inputForm: FormGroup;
  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute) {
    let order = new FormControl('');
    let point = new FormControl('', Validators.required);
    let questionth = new FormControl('');
    let questionen = new FormControl('');
    let groupid = new FormControl('');
    let subjectid = new FormControl('');
    let subid = new FormControl('');
    let courseth = new FormControl('');
    let courseen = new FormControl('');
    let keyword = new FormControl('');
    let questionlevel = new FormControl('');
    let timelimit = new FormControl('');
    let timelimittype = new FormControl('');
    let approvalstatus = new FormControl('');
    let status = new FormControl('');
    let questioncode = new FormControl('');
    let remark = new FormControl('');
    let choice = new FormControl('', Validators.required);

    this.inputForm = new FormGroup({
      questioncode: questioncode,
      order: order,
      point: point,
      questionth: questionth,
      questionen: questionen,
      groupid: groupid,
      subjectid: subjectid,
      subid: subid,
      courseth: courseth,
      courseen: courseen,
      keyword: keyword,
      questionlevel: questionlevel,
      timelimit: timelimit,
      timelimittype: timelimittype,
      approvalstatus: approvalstatus,
      remark: remark,
      status: status,
      choice: choice,
    });
  }

  ngOnInit() {
    this.qid = this.route.snapshot.params['qid']; /* multi match question id */
    this.id = this.route.snapshot.params['id'];
    this.choicelist = this.appdata.getchoice();

    this.inputForm.patchValue({ point: 1 });
    this.inputForm.patchValue({ choice: "A" });
    if (this.id != null && parseInt(this.id) > 0) {
      var formdata = { id: this.id };
      this.service.httpClientGet("api/Question/getquestion", formdata)
        .subscribe(result => {
          if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
            Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.router.navigate(['/question-multi-math/', this.qid]);
            this.loading = false;
          }
          else {
            if (result["result"] == 200) {
              setup_ckeditor();
              this.data = result;
              this.inputForm.patchValue({ order: this.data.order });
              this.inputForm.patchValue({ point: this.data.point });
              this.inputForm.patchValue({ choice: this.data.choice });

              this.inputForm.patchValue({ questioncode: this.data.questioncode });
              this.inputForm.patchValue({ groupid: this.data.groupid });
              this.inputForm.patchValue({ subjectid: this.data.subjectid });
              this.inputForm.patchValue({ subid: this.data.subid });
              this.inputForm.patchValue({ courseth: this.data.courseth });
              this.inputForm.patchValue({ courseen: this.data.courseen });
              this.inputForm.patchValue({ questionth: this.data.questionth });
              this.inputForm.patchValue({ questionen: this.data.questionen });
              this.inputForm.patchValue({ keyword: this.data.keyword });
              this.inputForm.patchValue({ questionlevel: this.data.questionlevel });
              this.inputForm.patchValue({ timelimit: this.data.timelimit });
              this.inputForm.patchValue({ timelimittype: this.data.timelimittype });
              this.inputForm.patchValue({ approvalstatus: this.data.approvalstatus });
              this.inputForm.patchValue({ remark: this.data.remark });
              this.inputForm.patchValue({ status: this.data.status });
              $('#questionth').val(this.data.questionth);
              $('#questionen').val(this.data.questionen);
            }
            else {
              Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
              this.router.navigate(['/question-multi-math/', this.qid]);
            }
            this.loading = false;
          }
        }, error => {
          Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        });
    }
    else {
      setup_ckeditor();
      this.OnGetParent();
    }
  }
  OnGetParent() {
    if (this.qid != null && parseInt(this.qid) > 0) {
      this.loading = true;
      var formdata = { id: this.qid };
      this.service.httpClientGet("api/Question/getquestion", formdata)
        .subscribe(result => {
          if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
            Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.router.navigate(['/question-multi-math/', 0]);
            this.loading = false;
          }
          else {
            if (result["result"] == 200) {
              setup_ckeditor();

              this.data = result;
              this.inputForm.patchValue({ groupid: this.data.groupid });
              this.inputForm.patchValue({ subjectid: this.data.subjectid });
              this.inputForm.patchValue({ subid: this.data.subid });
              this.inputForm.patchValue({ courseth: this.data.courseth });
              this.inputForm.patchValue({ courseen: this.data.courseen });
              this.inputForm.patchValue({ keyword: this.data.keyword });
              this.inputForm.patchValue({ questionlevel: this.data.questionlevel });
              this.inputForm.patchValue({ timelimit: this.data.timelimit });
              this.inputForm.patchValue({ timelimittype: this.data.timelimittype });
              this.inputForm.patchValue({ approvalstatus: this.data.approvalstatus });
              this.inputForm.patchValue({ status: this.data.status });
            }
            else {
              Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
              this.router.navigate(['/question-multi-math/', this.qid]);
            }
            this.loading = false;
          }
        }, error => {
          Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          this.loading = false;
        });
    }
  }

  OnSubmit() {
    this.inputForm.controls['point'].markAsTouched();
    this.inputForm.controls['questionth'].markAsTouched();
    this.inputForm.controls['questionen'].markAsTouched();
    this.inputForm.controls['choice'].markAsTouched();

    var questionth = $('#questionth').val();
    var questionen = $('#questionen').val();
    this.inputForm.patchValue({ questionth: questionth });
    this.inputForm.patchValue({ questionen: questionen });

    this.inputForm.controls['questionth'].setErrors(null);
    this.inputForm.controls['questionen'].setErrors(null);
    if (this.inputForm.value.questionth == "" && this.inputForm.value.questionen == "") {
      this.inputForm.controls['questionth'].setErrors({ 'incorrect': true });
      this.inputForm.controls['questionen'].setErrors({ 'incorrect': true });
    }
    if (this.inputForm.valid) {
      let formdata = {
        ID: this.id,
        QuestionParentID: this.qid,
        QuestionType: 16,
        ChildOrder: this.inputForm.value.order,
        Point: this.inputForm.value.point,
        QuestionTh: this.inputForm.value.questionth,
        QuestionEn: this.inputForm.value.questionen,
        SubjectGroupID: this.inputForm.value.groupid,
        SubjectID: this.inputForm.value.subjectid,
        SubjectSubID: this.inputForm.value.subid,
        CourseTh: this.inputForm.value.courseth,
        CourseEn: this.inputForm.value.courseen,
        Keyword: this.inputForm.value.keyword,
        QuestionLevel: this.inputForm.value.questionlevel,
        TimeLimit: this.inputForm.value.timelimit,
        TimeLimitType: this.inputForm.value.timelimittype,
        Status: this.inputForm.value.status,
        ApprovalStatus: this.inputForm.value.approvalstatus,
        Choice: this.inputForm.value.choice,
      };
      this.loading = true;
      if (this.id != null && parseInt(this.id) > 0) {
        this.service.httpClientPost("api/Question/update", formdata)
          .subscribe(result => {
            if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
              Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            }
            else {
              if (result["result"] == 200) {
                this.router.navigate(['/question-multi-math/', this.qid]);
              }
              else {
                Swal.fire({ text: result["message"], type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
              }
            }
            this.loading = false;
          }, error => {
            Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.loading = false;
          });
      }
      else {
        this.service.httpClientPost("api/Question/insert", formdata)
          .subscribe(result => {
            if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
              Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            }
            else {
              if (result["result"] == 200) {
                this.router.navigate(['/question-multi-math/', this.qid]);
              }
              else {
                Swal.fire({ text: result["message"], type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
              };
            }
            this.loading = false;
          }, error => {
            Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.loading = false;
          });
      }
    }
  }

  OnBack() {
    this.router.navigate(['/question-multi-math/', this.qid]);
    return false;
  }
}
