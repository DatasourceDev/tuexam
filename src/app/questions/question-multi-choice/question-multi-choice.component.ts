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
  selector: 'app-question-multi-choice',
  templateUrl: './question-multi-choice.component.html',
  styleUrls: ['./question-multi-choice.component.css']
})
export class QuestionMultiChoiceComponent implements OnInit {
  public loading = false;
  private ansdata: any;
  private data: any;
  private statuslist: any;
  private grouplist: any;
  private subjectlist: any;
  private sublist: any;
  private levellist: any;
  private approvelist: any;
  private courselist: any;
  private timetypelist: any;

  id: string;
  inputForm: FormGroup;

  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute) {
    let questioncode = new FormControl('');
    let status = new FormControl('', Validators.required);
    let groupid = new FormControl('', Validators.required);
    let subjectid = new FormControl('', Validators.required);
    let subid = new FormControl('', Validators.required);
    let courseth = new FormControl('');
    let courseen = new FormControl('');
    let questionth = new FormControl('');
    let questionen = new FormControl('');
    let keyword = new FormControl('');
    let questionlevel = new FormControl('', Validators.required);
    let timelimit = new FormControl('');
    let timelimittype = new FormControl('');
    let approvalstatus = new FormControl('');
    let remark = new FormControl('');

    this.inputForm = new FormGroup({
      questioncode: questioncode,
      status: status,
      groupid: groupid,
      subjectid: subjectid,
      subid: subid,
      courseth: courseth,
      courseen: courseen,
      questionth: questionth,
      questionen: questionen,
      keyword: keyword,
      questionlevel: questionlevel,
      timelimit: timelimit,
      timelimittype: timelimittype,
      approvalstatus: approvalstatus,
      remark: remark,
    });

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.statuslist = this.appdata.getstatus();
    this.levellist = this.appdata.getlevel();
    this.courselist = this.appdata.getcourse();
    this.approvelist = this.appdata.getapprovestatus();
    this.timetypelist = this.appdata.gettimetype();

    this.inputForm.patchValue({ status: "1" });
    this.inputForm.patchValue({ questionlevel: "2" });
    this.inputForm.patchValue({ timelimittype: "0" });
    this.inputForm.patchValue({ approvalstatus: "0" });

    if (this.id != null && parseInt(this.id) > 0) {
      this.loading = true;
      var formdata = { id: this.id };
      this.service.httpClientGet("api/Question/getquestion", formdata)
        .subscribe(result => {
          if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
            Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.router.navigate(['/question-search/']);
            this.loading = false;
          }
          else {
            if (result["result"] == -101) {
              Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
              this.router.navigate(['/question-search/']);
            }
            else {
              setup_ckeditor();

              this.data = result;
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
              
              this.OnGroupList(false);
              this.OnSujectList(false);
              this.OnSubList(false);

              $('#questionth').val(this.data.questionth);
              $('#questionen').val(this.data.questionen);
            }
            this.loading = false;
          }
        }, error => {
          this.loading = false;
        });

        this.OnAnsSearch();
    }
    else {
      setup_ckeditor();
      this.OnGroupList(true);
    }
  }
  OnAnsSearch() {
    var formdata = { id: this.id };
    this.service.httpClientGet("api/Question/listanswer", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.ansdata = null;
        }
        else {
          this.ansdata = result;
        }
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }
  OnGroupChange() {
    this.OnSujectList(false);
    this.inputForm.patchValue({ subjectid: '' });
    this.inputForm.patchValue({ subid: '' });
  }
  OnSubjectChange() {
    this.OnSubList(false);
    this.inputForm.patchValue({ subid: '' });
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
              this.OnSubList(setdefault);
            }
          }

        }
      }, error => {

      });
  }
  OnSubList(setdefault) {
    this.inputForm.patchValue({ sub_search: '' });

    let formdata = {
      subject_search: this.inputForm.value.subjectid
    };
    this.service.httpClientGet("api/SubjectSub/listActivesub", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.sublist = null;
        }
        else {
          this.sublist = result;
          if (setdefault == true) {
            if (this.sublist != null && this.sublist.length > 0) {
              var sub = this.sublist[0];
              this.inputForm.patchValue({ subid: sub.id });
            }
          }
        }
      }, error => {

      });
  }
  OnSubmit(gochild) {

    this.inputForm.controls['groupid'].markAsTouched();
    this.inputForm.controls['subjectid'].markAsTouched();
    this.inputForm.controls['subid'].markAsTouched();
    this.inputForm.controls['courseth'].markAsTouched();
    this.inputForm.controls['courseen'].markAsTouched();
    this.inputForm.controls['questionth'].markAsTouched();
    this.inputForm.controls['questionen'].markAsTouched();
    this.inputForm.controls['keyword'].markAsTouched();
    this.inputForm.controls['questionlevel'].markAsTouched();
    this.inputForm.controls['timelimit'].markAsTouched();
    this.inputForm.controls['timelimittype'].markAsTouched();
    this.inputForm.controls['status'].markAsTouched();
    this.inputForm.controls['approvalstatus'].markAsTouched();
    this.inputForm.controls['remark'].markAsTouched();

    var questionth = $('#questionth').val();
    var questionen = $('#questionen').val();
    this.inputForm.patchValue({ questionth: questionth });
    this.inputForm.patchValue({ questionen: questionen });

    if (this.inputForm.value.courseth == "")
      this.inputForm.patchValue({ courseth: false });

    if (this.inputForm.value.courseen == "")
      this.inputForm.patchValue({ courseen: false });

    this.inputForm.controls['courseth'].setErrors(null); 
    if (this.inputForm.value.courseth == false && this.inputForm.value.courseen == false) {
      this.inputForm.controls['courseth'].setErrors({ 'incorrect': true });
    }
    this.inputForm.controls['questionth'].setErrors(null);
    this.inputForm.controls['questionen'].setErrors(null);
    if (this.inputForm.value.questionth == "" && this.inputForm.value.questionen == "") {
      this.inputForm.controls['questionth'].setErrors({ 'incorrect': true });
      this.inputForm.controls['questionen'].setErrors({ 'incorrect': true });
    }

    if (this.inputForm.valid) {
      let formdata = {
        ID: this.id,
        QuestionType:1,
        SubjectGroupID: this.inputForm.value.groupid,
        SubjectID: this.inputForm.value.subjectid,
        SubjectSubID: this.inputForm.value.subid,
        CourseTh: this.inputForm.value.courseth,
        CourseEn: this.inputForm.value.courseen,
        QuestionTh: this.inputForm.value.questionth,
        QuestionEn: this.inputForm.value.questionen,
        Keyword: this.inputForm.value.keyword,
        QuestionLevel: this.inputForm.value.questionlevel,
        TimeLimit: this.inputForm.value.timelimit,
        TimeLimitType: this.inputForm.value.timelimittype,
        Status: this.inputForm.value.status,
        ApprovalStatus: this.inputForm.value.approvalstatus,
        Remark: this.inputForm.value.remark,
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
                this.router.navigate(['/question-search/']);
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
        this.service.httpClientPost("api/Question/insert", formdata)
          .subscribe(result => {
            if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
              Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            }
            else {
              if (result["result"] == 200) {
                if (gochild == true) {
                  this.router.navigate(['/answer/', result["id"], 0]);
                }
                else {
                  this.router.navigate(['/question-search/']);
                }
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


  OnAnsAdd() {
    if (this.id == null || parseInt(this.id) == 0) {
      Swal.fire({ text: 'ทำการบันทึกข้อมูลก่อนไปยังขั้นตอนจัดการคำตอบ', type: 'info', showCancelButton: true, cancelButtonText: 'ยกเลิก', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-blue', cancelButton: 'btn btn-white' } }).then((result) => {
        if (result.value == true) {
          this.OnSubmit(true);
        }
      });
    }
    else {
      this.router.navigate(['/answer/', this.id, 0]);
      return false;
    }
  }

  OnAnsEdit(id) {
    this.router.navigate(["/answer/", this.id, id]);
    return false;
  }
  OnAnsDelete(id) {
    Swal.fire({ text: 'คุณต้องการที่จะลบรายการนี้', type: 'warning', showCancelButton: true, cancelButtonText: 'ยกเลิก', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-blue', cancelButton: 'btn btn-white' } }).then((result) => {
      if (result.value == true) {
        let deldata = { id: id };
        this.service.httpClientGet("api/Question/answerdelete", deldata)
          .subscribe(result => {
            this.OnAnsSearch();
          }, error => {
            Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          });
      }
    });
    return false;
  }

  convert_html_to_string(html) {
    var result = html.replace(/(<([^>]+)>)/g, "");
    if (result.length > 20) {
      result = result.substring(0, 20) + ' ...';
    }
    return result;
  }
}
