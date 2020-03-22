import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { SessionService } from '../../share/service/session.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PlyrComponent } from 'ngx-plyr';

import Swal from 'sweetalert2';
declare var $: any;
declare var setup_ckeditor: any;
import Plyr from 'plyr';

@Component({
  selector: 'app-question-attitude',
  templateUrl: './question-attitude.component.html',
  styleUrls: ['./question-attitude.component.css']
})
export class QuestionAttitudeComponent implements OnInit {
  public useraccesdata: any;

  public loading = false;
  private ansdata: any;
  private data: any;
  private data2: any;
  private statuslist: any;
  private grouplist: any;
  private subjectlist: any;
  private sublist: any;
  private levellist: any;
  private approvelist: any;
  private courselist: any;
  private timetypelist: any;
  private attitudeanstypelist: any;
  private attitudeanssubtypelist: any;

  fileurl: string;
  id: string;
  pid: string;
  inputForm: FormGroup;
  uploadForm: FormGroup;

  @ViewChild(PlyrComponent, { static: true })
  plyr: PlyrComponent;

  player: Plyr;
  videoSources: Plyr.Source[] = [{}];

  played(event: Plyr.PlyrEvent) {

  }

  play() {
    this.player.play(); // or this.plyr.player.play()
    return false;
  }


  constructor(public session: SessionService, private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute) {
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
    let approvalstatusname = new FormControl('');
    let remark = new FormControl('');
    let attitudeanstype = new FormControl(Validators.required);
    let attitudeanssubtype = new FormControl(Validators.required);
    let fileurl = new FormControl('');
    let filename = new FormControl('');
    let filetype = new FormControl('');
    let text1 = new FormControl('');
    let text2 = new FormControl('');
    let text3 = new FormControl('');
    let text4 = new FormControl('');
    let text5 = new FormControl('');
    let text6 = new FormControl('');
    let text7 = new FormControl('');
    let point1 = new FormControl('');
    let point2 = new FormControl('');
    let point3 = new FormControl('');
    let point4 = new FormControl('');
    let point5 = new FormControl('');
    let point6 = new FormControl('');
    let point7 = new FormControl('');
    let update_on = new FormControl('');
    let update_by = new FormControl('');
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
      approvalstatusname: approvalstatusname,
      remark: remark,
      attitudeanstype: attitudeanstype,
      attitudeanssubtype: attitudeanssubtype,
      fileurl: fileurl,
      filename: filename,
      filetype: filetype,
      text1: text1,
      text2: text2,
      text3: text3,
      text4: text4,
      text5: text5,
      text6: text6,
      text7: text7,
      point1: point1,
      point2: point2,
      point3: point3,
      point4: point4,
      point5: point5,
      point6: point6,
      point7: point7,
      update_on: update_on,
      update_by: update_by,
    });

    let fileupload = new FormControl();
    let questionid = new FormControl('');

    this.uploadForm = new FormGroup({
      questionid: questionid,
      fileupload: fileupload,
      update_by: update_by,
    });

    let useracces = this.session.getData();
    this.useraccesdata = JSON.parse(useracces);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.pid = this.route.snapshot.params['pid'];

    this.statuslist = this.appdata.getstatus();
    this.levellist = this.appdata.getlevel();
    this.courselist = this.appdata.getcourse();
    this.approvelist = this.appdata.getapprovestatus();
    this.timetypelist = this.appdata.gettimetype();
    this.attitudeanstypelist = this.appdata.getattitudeanstype();
    this.attitudeanssubtypelist = this.appdata.getattitudeanssubtype();

    this.inputForm.patchValue({ status: "1" });
    this.inputForm.patchValue({ questionlevel: "2" });
    this.inputForm.patchValue({ timelimittype: "0" });
    this.inputForm.patchValue({ approvalstatus: "0" });
    this.inputForm.patchValue({ approvalstatusname: "ร่าง" });
    this.inputForm.patchValue({ attitudeanstype: "2" });
    this.inputForm.patchValue({ attitudeanssubtype: "1" });
    this.inputForm.patchValue({ courseth: true });

    if (this.id != null && parseInt(this.id) > 0) {
      this.loading = true;
      var formdata = { id: this.id };
      this.service.httpClientGet("api/Question/getquestion", formdata)
        .subscribe(result => {
          if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
            Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            if (this.pid != null && parseInt(this.pid) > 0)
              this.router.navigate(['/question-read-text-multi-choice/', this.pid, 0]);
            else
              this.router.navigate(['/question-search/']);
            this.loading = false;
          }
          else {
            if (result["result"] == 200) {
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
              this.inputForm.patchValue({ approvalstatusname: this.data.approvalstatusname });
              this.inputForm.patchValue({ remark: this.data.remark });
              this.inputForm.patchValue({ status: this.data.status });
              this.inputForm.patchValue({ attitudeanstype: this.data.attitudeanstype });
              this.inputForm.patchValue({ attitudeanssubtype: this.data.attitudeanssubtype });
              this.inputForm.patchValue({ fileurl: this.data.fileurl });
              this.inputForm.patchValue({ filename: this.data.filename });
              this.inputForm.patchValue({ filetype: this.data.filetype });
              this.inputForm.patchValue({ update_by: this.data.update_by });
              this.inputForm.patchValue({ update_on: this.data.update_on });
             


              this.fileurl = this.data.fileurl;
              this.videoSources = [
                {
                  src: this.data.fileurl,
                  type: this.data.filetype,
                },
              ];
              this.OnGroupList(false);
              this.OnSujectList(false);
              this.OnSubList(false);
              this.OnTypeChange();

              

              $('#questionth').val(this.data.questionth);
              $('#questionen').val(this.data.questionen);
              this.OnGetParent();
            }
            else {
              Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
              if (this.pid != null && parseInt(this.pid) > 0)
                this.router.navigate(['/question-read-text-multi-choice/', this.pid, 0]);
              else
                this.router.navigate(['/question-search/']);
            }
            this.loading = false;
          }
        }, error => {
            Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          this.loading = false;
        });
    }
    else {
      setup_ckeditor();
      this.OnGroupList(true);
      this.OnGetParent();
      this.OnTypeChange();
    }
    
  }
  
  OnGetParent() {
    if (this.pid != null && parseInt(this.pid) > 0) {
      this.loading = true;
      var formdata = { id: this.pid };
      this.service.httpClientGet("api/Question/getquestion", formdata)
        .subscribe(result => {
          if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
            Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.router.navigate(['/question-read-text-multi-choice/', this.pid, 0]);
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
              this.inputForm.patchValue({ approvalstatusname: this.data.approvalstatusname });
              this.inputForm.patchValue({ status: this.data.status });
            }
            else {
              Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
              this.router.navigate(['/question-read-text-multi-choice/', this.pid, 0]);
            }
            this.loading = false;
          }
        }, error => {
            Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          this.loading = false;
        });
    }
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
          Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
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
          Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });

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
          Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });

      });
  }

  OnSubmit() {

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
    this.inputForm.controls['approvalstatusname'].markAsTouched();
    this.inputForm.controls['remark'].markAsTouched();
    this.inputForm.controls['attitudeanstype'].markAsTouched();
    this.inputForm.controls['attitudeanssubtype'].markAsTouched();
    this.inputForm.controls['fileurl'].markAsTouched();
    this.inputForm.controls['filename'].markAsTouched();
    this.inputForm.controls['filetype'].markAsTouched();
    this.inputForm.controls['text1'].markAsTouched();
    this.inputForm.controls['text2'].markAsTouched();
    this.inputForm.controls['text3'].markAsTouched();
    this.inputForm.controls['text4'].markAsTouched();
    this.inputForm.controls['text5'].markAsTouched();
    this.inputForm.controls['text6'].markAsTouched();
    this.inputForm.controls['text7'].markAsTouched();
    this.inputForm.controls['point1'].markAsTouched();
    this.inputForm.controls['point2'].markAsTouched();
    this.inputForm.controls['point3'].markAsTouched();
    this.inputForm.controls['point4'].markAsTouched();
    this.inputForm.controls['point5'].markAsTouched();
    this.inputForm.controls['point6'].markAsTouched();
    this.inputForm.controls['point7'].markAsTouched();

    var questionth = $('#questionth').val();
    var questionen = $('#questionen').val();
    this.inputForm.patchValue({ questionth: questionth });
    this.inputForm.patchValue({ questionen: questionen });

    if (this.inputForm.value.courseth === "")
      this.inputForm.patchValue({ courseth: false });

    if (this.inputForm.value.courseen === "")
      this.inputForm.patchValue({ courseen: false });

    this.inputForm.controls['courseth'].setErrors(null);
    if (this.inputForm.value.courseth == false && this.inputForm.value.courseen == false) {
      this.inputForm.controls['courseth'].setErrors({ 'incorrect': true });
    }
    this.inputForm.controls['questionth'].setErrors(null);
    this.inputForm.controls['questionen'].setErrors(null);
    if (this.inputForm.value.questionth === "" && this.inputForm.value.questionen === "") {
      this.inputForm.controls['questionth'].setErrors({ 'incorrect': true });
      this.inputForm.controls['questionen'].setErrors({ 'incorrect': true });
    }
    this.inputForm.controls['point1'].setErrors(null);
    this.inputForm.controls['point2'].setErrors(null);
    this.inputForm.controls['point3'].setErrors(null);
    this.inputForm.controls['point4'].setErrors(null);
    this.inputForm.controls['point5'].setErrors(null);
    this.inputForm.controls['point6'].setErrors(null);
    this.inputForm.controls['point7'].setErrors(null);
    if (this.inputForm.value.attitudeanstype == "2") {
      if (this.inputForm.value.point1 == null || this.inputForm.value.point1 === "") {
        this.inputForm.controls['point1'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point2 == null || this.inputForm.value.point2 === "") {
        this.inputForm.controls['point2'].setErrors({ 'incorrect': true });
      }

    }
    else if (this.inputForm.value.attitudeanstype == "3") {
      if (this.inputForm.value.point1 == null || this.inputForm.value.point1 === "") {
          this.inputForm.controls['point1'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point2 == null || this.inputForm.value.point2 === "") {
        this.inputForm.controls['point2'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point3 == null || this.inputForm.value.point3 === "") {
        this.inputForm.controls['point3'].setErrors({ 'incorrect': true });
      }
    }
    else if (this.inputForm.value.attitudeanstype == "4") {
      if (this.inputForm.value.point1 == null || this.inputForm.value.point1 === "") {
        this.inputForm.controls['point1'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point2 == null || this.inputForm.value.point2 === "") {
        this.inputForm.controls['point2'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point3 == null || this.inputForm.value.point3 === "") {
        this.inputForm.controls['point3'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point4 == null || this.inputForm.value.point4 === "") {
        this.inputForm.controls['point4'].setErrors({ 'incorrect': true });
      }
    }
    else if (this.inputForm.value.attitudeanstype == "5") {
      if (this.inputForm.value.point1 == null || this.inputForm.value.point1 === "") {
        this.inputForm.controls['point1'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point2 == null || this.inputForm.value.point2 === "") {
        this.inputForm.controls['point2'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point3 == null || this.inputForm.value.point3 === "") {
        this.inputForm.controls['point3'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point4 == null || this.inputForm.value.point4 === "") {
        this.inputForm.controls['point4'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point5 == null || this.inputForm.value.point5 === "") {
        this.inputForm.controls['point5'].setErrors({ 'incorrect': true });
      }
    }
    else if (this.inputForm.value.attitudeanstype == "6") {  
      if (this.inputForm.value.point1 == null || this.inputForm.value.point1 === "") {
        this.inputForm.controls['point1'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point2 == null || this.inputForm.value.point2 === "") {
        this.inputForm.controls['point2'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point3 == null || this.inputForm.value.point3 === "") {
        this.inputForm.controls['point3'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point4 == null || this.inputForm.value.point4 === "") {
        this.inputForm.controls['point4'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point5 == null || this.inputForm.value.point5 === "") {
        this.inputForm.controls['point5'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point6 == null || this.inputForm.value.point6 === "") {
        this.inputForm.controls['point6'].setErrors({ 'incorrect': true });
      }
    }
    else if (this.inputForm.value.attitudeanstype == "7") {      

      if (this.inputForm.value.point1 == null || this.inputForm.value.point1 === "") {
        this.inputForm.controls['point1'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point2 == null || this.inputForm.value.point2 === "") {
        this.inputForm.controls['point2'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point3 == null || this.inputForm.value.point3 === "") {
        this.inputForm.controls['point3'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point4 == null || this.inputForm.value.point4 === "") {
        this.inputForm.controls['point4'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point5 == null || this.inputForm.value.point5 === "") {
        this.inputForm.controls['point5'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point6 == null || this.inputForm.value.point6 === "") {
        this.inputForm.controls['point6'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point7 == null || this.inputForm.value.point7 === "") {
        this.inputForm.controls['point7'].setErrors({ 'incorrect': true });
      }
    }

    if (this.inputForm.valid) {
      let formdata = {
        ID: this.id,
        QuestionParentID: this.pid,
        QuestionType: 8,
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
        AttitudeAnsType: this.inputForm.value.attitudeanstype,
        AttitudeAnsSubType: this.inputForm.value.attitudeanssubtype,
        FileUrl: this.inputForm.value.fileurl,
        FileName: this.inputForm.value.filename,
        FileType: this.inputForm.value.filetype,
        Point1: this.inputForm.value.point1,
        Point2: this.inputForm.value.point2,
        Point3: this.inputForm.value.point3,
        Point4: this.inputForm.value.point4,
        Point5: this.inputForm.value.point5,
        Point6: this.inputForm.value.point6,
        Point7: this.inputForm.value.point7,
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
                if (this.pid != null && parseInt(this.pid) > 0)
                  this.router.navigate(['/question-read-text-multi-choice/', this.pid, 0]);
                else
                  this.router.navigate(['/question-search/']);
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

                if (this.pid != null && parseInt(this.pid) > 0)
                  this.router.navigate(['/question-read-text-multi-choice/', this.pid, 0]);
                else
                  this.router.navigate(['/question-search/']);

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

  OnTypeChange() {
    if (this.inputForm.value.attitudeanstype == "2") {
      $('#div1').show();
      $('#div2').show();
      $('#div3').hide();
      $('#div4').hide();
      $('#div5').hide();
      $('#div6').hide();
      $('#div7').hide();
    }
    if (this.inputForm.value.attitudeanstype == "3") {
      $('#div1').show();
      $('#div2').show();
      $('#div3').show();
      $('#div4').hide();
      $('#div5').hide();
      $('#div6').hide();
      $('#div7').hide();
    }
    else if (this.inputForm.value.attitudeanstype == "4") {
      $('#div1').show();
      $('#div2').show();
      $('#div3').show();
      $('#div4').show();
      $('#div5').hide();
      $('#div6').hide();
      $('#div7').hide();
    }
    else if (this.inputForm.value.attitudeanstype == "5") {
      $('#div1').show();
      $('#div2').show();
      $('#div3').show();
      $('#div4').show();
      $('#div5').show();
      $('#div6').hide();
      $('#div7').hide();
    }
    else if (this.inputForm.value.attitudeanstype == "6") {
      $('#div1').show();
      $('#div2').show();
      $('#div3').show();
      $('#div4').show();
      $('#div5').show();
      $('#div6').show();
      $('#div7').hide();
    }
    else if (this.inputForm.value.attitudeanstype == "7") {
      $('#div1').show();
      $('#div2').show();
      $('#div3').show();
      $('#div4').show();
      $('#div5').show();
      $('#div6').show();
      $('#div7').show();
    }
    this.OnAttSearch();
  }
  OnAttSearch() {
    this.loading = true;
    let formdata = {
      type_search: this.inputForm.value.attitudeanstype,
      subtype_search: this.inputForm.value.attitudeanssubtype
    };
    this.service.httpClientGet("api/AttitudeSetup/getattitudesetup", formdata)
      .subscribe(result => {
        if (result["result"] == 200) {
          if (result != null) {
            this.data2 = result;
            this.inputForm.patchValue({ text1: this.data2.text1 });
            this.inputForm.patchValue({ text2: this.data2.text2 });
            this.inputForm.patchValue({ text3: this.data2.text3 });
            this.inputForm.patchValue({ text4: this.data2.text4 });
            this.inputForm.patchValue({ text5: this.data2.text5 });
            this.inputForm.patchValue({ text6: this.data2.text6 });
            this.inputForm.patchValue({ text7: this.data2.text7 });

            this.inputForm.patchValue({ point1: this.data2.point1 });
            this.inputForm.patchValue({ point2: this.data2.point2 });
            this.inputForm.patchValue({ point3: this.data2.point3 });
            this.inputForm.patchValue({ point4: this.data2.point4 });
            this.inputForm.patchValue({ point5: this.data2.point5 });
            this.inputForm.patchValue({ point6: this.data2.point6 });
            this.inputForm.patchValue({ point7: this.data2.point7 });

            if (this.data != null && this.data.point1 != null && this.data.point1 > 0)
              this.inputForm.patchValue({ point1: this.data.point1 });
            if (this.data != null && this.data.point1 != null && this.data.point2 > 0)
              this.inputForm.patchValue({ point2: this.data.point2 });
            if (this.data != null && this.data.point1 != null && this.data.point3 > 0)
              this.inputForm.patchValue({ point3: this.data.point3 });
            if (this.data != null && this.data.point1 != null && this.data.point4 > 0)
              this.inputForm.patchValue({ point4: this.data.point4 });
            if (this.data != null && this.data.point1 != null && this.data.point5 > 0)
              this.inputForm.patchValue({ point5: this.data.point5 });
            if (this.data != null && this.data.point1 != null && this.data.point6 > 0)
              this.inputForm.patchValue({ point6: this.data.point6 });
            if (this.data != null && this.data.point1 != null && this.data.point7 > 0)
              this.inputForm.patchValue({ point7: this.data.point7 });
          }
        }
        else {
          this.inputForm.patchValue({ text1: '' });
          this.inputForm.patchValue({ text2: '' });
          this.inputForm.patchValue({ text3: '' });
          this.inputForm.patchValue({ text4: '' });
          this.inputForm.patchValue({ text5: '' });
          this.inputForm.patchValue({ text6: '' });
          this.inputForm.patchValue({ text7: '' });
          this.inputForm.patchValue({ point1: '' });
          this.inputForm.patchValue({ point2: '' });
          this.inputForm.patchValue({ point3: '' });
          this.inputForm.patchValue({ point4: '' });
          this.inputForm.patchValue({ point5: '' });
          this.inputForm.patchValue({ point6: '' });
          this.inputForm.patchValue({ point7: '' });
        }
        this.loading = false;

      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
  }

  incomingfile(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.uploadForm.get('fileupload').setValue({
          filename: file.name,
          filetype: file.type,
          value: (<string>reader.result).split(',')[1]
        })
      };
    }
  }
  OnFileUpload() {
    if (this.uploadForm.value.fileupload == null || this.uploadForm.value.fileupload == '') {
      Swal.fire({ text: 'กรุณาระบุไฟล์นำเข้า', type: 'warning', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
      return false;
    }
    if (this.id == null || parseInt(this.id) == 0) {
      Swal.fire({ text: 'หลังจากกดปุ่มตกลง ระบบจะบันทึกข้อมูลเข้าสู่ระบบ', type: 'info', showCancelButton: true, cancelButtonText: 'ยกเลิก', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-blue', cancelButton: 'btn btn-white' } }).then((result) => {
        if (result.value == true) {
          this.OnSubmit();
        }
      });
    }
    else {
      this.OnUpload();
    }
  }
  OnUpload() {
    this.loading = true;
    this.uploadForm.patchValue({ questionid: this.id });
    this.uploadForm.patchValue({ update_by: this.useraccesdata.username });
    let data = JSON.stringify(this.uploadForm.value);
    this.service.httpClientFilePost("api/Question/fileupload", data)
      .subscribe(result => {
        if (result["result"] == 200) {
          this.fileurl = result["fileurl"];
          this.inputForm.patchValue({ fileurl: result["fileurl"] });
          this.inputForm.patchValue({ filename: result["filename"] });
          this.inputForm.patchValue({ filetype: result["filetype"] });
          this.videoSources = [
            {
              src: result["fileurl"],
              type: result["filetype"],
            },
          ];
        }
        this.loading = false;
      }, error => {
          Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
  }
  OnFileDelete() {
    Swal.fire({ text: 'คุณต้องการที่จะไฟล์นี้', type: 'warning', showCancelButton: true, cancelButtonText: 'ยกเลิก', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-blue', cancelButton: 'btn btn-white' } }).then((result) => {
      if (result.value == true) {
        let deldata = { id: this.id };
        this.service.httpClientGet("api/Question/filedelete", deldata)
          .subscribe(result => {
            if (result["result"] == 200) {
              this.fileurl = "";
            }
            else
              Swal.fire({ text: result["message"], type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          }, error => {
            Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          });
      }
    });
  }
  OnApprove() {
    Swal.fire({ text: 'คุณต้องการเริ่มกระบวนการกลั่นกรองข้อสอบ', type: 'warning', showCancelButton: true, cancelButtonText: 'ยกเลิก', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-blue', cancelButton: 'btn btn-white' } }).then((result) => {
      if (result.value == true) {
        let formdata = { id: this.id };
        this.service.httpClientGet("api/Question/approveconfirm", formdata)
          .subscribe(result => {
            Swal.fire({ text: 'ส่งกลั่นกรองสำเร็จ', type: 'success', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.router.navigate(['/question-search/']);
          }, error => {
            Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          });
      }
    });
    return false;
  }
  
}
