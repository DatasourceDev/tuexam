import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from "../../share/service/app.service";
import { SessionService } from '../../share/service/session.service';
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
import { PlyrComponent } from 'ngx-plyr';
declare var $: any;
declare var setup_ckeditor: any;
import Plyr from 'plyr';
@Component({
  selector: 'app-question-view-child',
  templateUrl: './question-view-child.component.html',
  styleUrls: ['./question-view-child.component.css']
})

export class QuestionViewChildComponent implements OnInit {
  public useraccesdata: any;
  private ansdata: any;

  public loading = false;
  private questiondata: any;
  private data: any;
  private data2: any;

  questionth: string;
  questionen: string;
  questiontype: string;

  isapproval: boolean;
  private appstaffdata: any;


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
    let status = new FormControl('');
    let statusname = new FormControl('');
    let groupid = new FormControl('');
    let group = new FormControl('');
    let subjectid = new FormControl('');
    let subject = new FormControl('');
    let subid = new FormControl('');
    let sub = new FormControl('');
    let courseth = new FormControl('');
    let courseen = new FormControl('');
    let questionth = new FormControl('');
    let questionen = new FormControl('');
    let keyword = new FormControl('');
    let questionlevel = new FormControl('');
    let questionlevelname = new FormControl('');
    let timelimit = new FormControl('');
    let timelimittype = new FormControl('');
    let timelimittypename = new FormControl('');
    let approvalstatus = new FormControl('');
    let approvalstatusname = new FormControl('');
    let remark = new FormControl('');
    let fileurl = new FormControl('');
    let filename = new FormControl('');
    let filetype = new FormControl('');
    let update_on = new FormControl('');
    let update_by = new FormControl('');
    let tpoint = new FormControl('');
    let fpoint = new FormControl('');
    let approveremark = new FormControl('');
    let attitudeanstype = new FormControl('');
    let attitudeanssubtype = new FormControl('');
    let attitudeanstypename = new FormControl('');
    let attitudeanssubtypename = new FormControl('');
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
    this.inputForm = new FormGroup({
      questioncode: questioncode,
      status: status,
      statusname: statusname,
      groupid: groupid,
      group: group,
      subjectid: subjectid,
      subject: subject,
      subid: subid,
      sub: sub,
      courseth: courseth,
      courseen: courseen,
      questionth: questionth,
      questionen: questionen,
      keyword: keyword,
      questionlevel: questionlevel,
      questionlevelname: questionlevelname,
      timelimit: timelimit,
      timelimittype: timelimittype,
      timelimittypename: timelimittypename,
      approvalstatus: approvalstatus,
      approvalstatusname: approvalstatusname,
      remark: remark,
      fileurl: fileurl,
      filename: filename,
      filetype: filetype,
      update_on: update_on,
      update_by: update_by,
      tpoint: tpoint,
      fpoint: fpoint,
      approveremark: approveremark,
      attitudeanstype: attitudeanstype,
      attitudeanssubtype: attitudeanssubtype,
      attitudeanstypename: attitudeanstypename,
      attitudeanssubtypename: attitudeanssubtypename,
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

    this.inputForm.patchValue({ status: "1" });
    this.inputForm.patchValue({ questionlevel: "2" });
    this.inputForm.patchValue({ timelimittype: "0" });
    this.inputForm.patchValue({ approvalstatus: "0" });
    this.inputForm.patchValue({ approvalstatusname: "ร่าง" });
    this.inputForm.patchValue({ courseth: true });

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
            if (result["result"] == 200) {

              this.data = result;
              this.inputForm.patchValue({ questioncode: this.data.questioncode });
              this.inputForm.patchValue({ groupid: this.data.groupid });
              this.inputForm.patchValue({ group: this.data.group });
              this.inputForm.patchValue({ subjectid: this.data.subjectid });
              this.inputForm.patchValue({ subject: this.data.subject });
              this.inputForm.patchValue({ subid: this.data.subid });
              this.inputForm.patchValue({ sub: this.data.sub });
              this.inputForm.patchValue({ courseth: this.data.courseth });
              this.inputForm.patchValue({ courseen: this.data.courseen });
              this.inputForm.patchValue({ questionth: this.data.questionth });
              this.inputForm.patchValue({ questionen: this.data.questionen });
              this.inputForm.patchValue({ keyword: this.data.keyword });
              this.inputForm.patchValue({ questionlevel: this.data.questionlevel });
              this.inputForm.patchValue({ questionlevelname: this.data.questionlevelname });
              this.inputForm.patchValue({ timelimit: this.data.timelimit });
              this.inputForm.patchValue({ timelimittype: this.data.timelimittype });
              this.inputForm.patchValue({ timelimittypename: this.data.timelimittypename });
              this.inputForm.patchValue({ approvalstatus: this.data.approvalstatus });
              this.inputForm.patchValue({ approvalstatusname: this.data.approvalstatusname });
              this.inputForm.patchValue({ remark: this.data.remark });
              this.inputForm.patchValue({ status: this.data.status });
              this.inputForm.patchValue({ statusname: this.data.statusname });
              this.inputForm.patchValue({ fileurl: this.data.fileurl });
              this.inputForm.patchValue({ filename: this.data.filename });
              this.inputForm.patchValue({ filetype: this.data.filetype });
              this.inputForm.patchValue({ update_by: this.data.update_by });
              this.inputForm.patchValue({ update_on: this.data.update_on });
              this.inputForm.patchValue({ tpoint: this.data.tpoint });
              this.inputForm.patchValue({ fpoint: this.data.fpoint });
              this.inputForm.patchValue({ attitudeanstype: this.data.attitudeanstype });
              this.inputForm.patchValue({ attitudeanstypename: this.data.attitudeanstypename });
              this.inputForm.patchValue({ attitudeanssubtype: this.data.attitudeanssubtype });
              this.inputForm.patchValue({ attitudeanssubtypename: this.data.attitudeanssubtypename });
              this.inputForm.patchValue({ point1: this.data.point1 });
              this.inputForm.patchValue({ point2: this.data.point2 });
              this.inputForm.patchValue({ point3: this.data.point3 });
              this.inputForm.patchValue({ point4: this.data.point4 });
              this.inputForm.patchValue({ point5: this.data.point5 });
              this.inputForm.patchValue({ point6: this.data.point6 });
              this.inputForm.patchValue({ point7: this.data.point7 });

              this.fileurl = this.data.fileurl;
              this.videoSources = [
                {
                  src: this.data.fileurl,
                  type: this.data.filetype,
                },
              ];
              this.questionth = this.data.questionth;
              this.questionen = this.data.questionen;
              this.questiontype = this.data.questiontype;

              this.OnTypeChange();
            }
            else {
              Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
              this.router.navigate(['/question-search/']);
            }
            this.loading = false;
          }
        }, error => {
          Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          this.loading = false;
        });

      this.OnQuestionSearch();
      this.OnAnsSearch();
    }
  }


  OnQuestionSearch() {
    var formdata = {
      pid: this.id,
    };
    this.service.httpClientGet("api/Question/listchildquestion", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.questiondata = null;
        }
        else {
          this.questiondata = result;
        }
        this.loading = false;
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
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
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
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
          }
        }
        this.loading = false;

      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
  }

  OnTypeChange() {
    $('#divq8').hide();
    if (this.questiontype == "8") {
      $('#divq8').show();
    }
    else
      return;

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

  OnView(id) {
    this.router.navigate(["/question-view-child/", id]);
    return false;
  }

  getquestion(th, en) {
    var name = th;
    if (th == null || th == '')
      name = en;
    return this.service.convert_html_to_string(name, 50);
  }
  getanswer(th, en) {
    var name = th;
    if (th == null || th == '')
      name = en;
    return this.service.convert_html_to_string(name, 50);
  }
}

