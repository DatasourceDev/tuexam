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
  selector: 'app-question-tf',
  templateUrl: './question-tf.component.html',
  styleUrls: ['./question-tf.component.css']
})
export class QuestionTfComponent implements OnInit {
  public useraccesdata: any;

  public loading = false;
  private data: any;
  //private audio: any;
  private statuslist: any;
  private grouplist: any;
  private subjectlist: any;
  private sublist: any;
  private levellist: any;
  private approvelist: any;
  private courselist: any;
  private timetypelist: any;

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
    let fileurl = new FormControl('');
    let filename = new FormControl('');
    let filetype = new FormControl('');
    let update_on = new FormControl('');
    let update_by = new FormControl('');
    let tpoint = new FormControl('');
    let fpoint = new FormControl('');

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
      fileurl: fileurl,
      filename: filename,
      filetype: filetype,
      update_on: update_on,
      update_by: update_by,
      tpoint: tpoint,
      fpoint: fpoint,
    });


    let fileupload = new FormControl();
    let questionid = new FormControl('');

    this.uploadForm = new FormGroup({
      questionid: questionid,
      fileupload: fileupload,
      update_by: update_by
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

    this.inputForm.patchValue({ status: "1" });
    this.inputForm.patchValue({ questionlevel: "2" });
    this.inputForm.patchValue({ timelimittype: "0" });
    this.inputForm.patchValue({ approvalstatus: "0" });
    this.inputForm.patchValue({ approvalstatusname: "ร่าง" });
    this.inputForm.patchValue({ courseth: true });
    this.inputForm.patchValue({ tpoint: 1 });
    this.inputForm.patchValue({ fpoint: 0 });

    if (this.id != null && parseInt(this.id) > 0) {
      this.loading = true;
      var formdata = { id: this.id };
      this.service.httpClientGet("api/Question/getquestion", formdata)
        .subscribe(result => {
          if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
            Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            if (this.pid != null && parseInt(this.pid) > 0) {
              this.router.navigate(['/question-read-text-multi-choice/', this.pid, 0]);
            }
            else {
              this.router.navigate(['/question-search/']);
            }
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
              this.inputForm.patchValue({ fileurl: this.data.fileurl });
              this.inputForm.patchValue({ filename: this.data.filename });
              this.inputForm.patchValue({ filetype: this.data.filetype });
              this.inputForm.patchValue({ update_by: this.data.update_by });
              this.inputForm.patchValue({ update_on: this.data.update_on });
              this.inputForm.patchValue({ tpoint: this.data.tpoint });
              this.inputForm.patchValue({ fpoint: this.data.fpoint });
              this.fileurl = this.data.fileurl;
              this.OnGroupList(false);
              this.OnSujectList(false);
              this.OnSubList(false);

              $('#questionth').val(this.data.questionth);
              $('#questionen').val(this.data.questionen);

              this.videoSources = [
                {
                  src: this.data.fileurl,
                  type: this.data.filetype,
                },
              ];
              this.OnGetParent();
            }
            else {
              Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
              if (this.pid != null && parseInt(this.pid) > 0) {
                this.router.navigate(['/question-read-text-multi-choice/', this.pid, 0]);
              }
              else {
                this.router.navigate(['/question-search/']);
              }
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

  OnSubmit(goanswer, goupload) {

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
    this.inputForm.controls['fileurl'].markAsTouched();
    this.inputForm.controls['filename'].markAsTouched();
    this.inputForm.controls['filetype'].markAsTouched();
    this.inputForm.controls['tpoint'].markAsTouched();
    this.inputForm.controls['fpoint'].markAsTouched();

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
        QuestionParentID: this.pid,
        QuestionType: 2,
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
        FileUrl: this.inputForm.value.fileurl,
        FileName: this.inputForm.value.filename,
        FileType: this.inputForm.value.filetype,
        TPoint: this.inputForm.value.tpoint,
        FPoint: this.inputForm.value.fpoint,
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
                if (this.pid != null && parseInt(this.pid) > 0) {
                  this.router.navigate(['/question-read-text-multi-choice/', this.pid, 0]);
                }
                else {
                  this.router.navigate(['/question-search/']);
                }
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
                this.id = result["id"];
                if (goanswer == true) {
                  this.router.navigate(['/answer/', result["id"], 0, this.pid]);
                }
                else if (goupload == true) {
                  this.OnUpload();
                }
                else {
                  if (this.pid != null && parseInt(this.pid) > 0) {
                    this.router.navigate(['/question-read-text-multi-choice/', this.pid, 0]);
                  }
                  else {
                    this.router.navigate(['/question-search/']);
                  }
                }
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
          this.OnSubmit(false, true);
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
  getanswer(th, en) {
    var name = th;
    if (th == null || th == '')
      name = en;
    return this.service.convert_html_to_string(name, 50);
  }
}
