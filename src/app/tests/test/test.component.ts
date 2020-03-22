import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  public loading = false;
  private data: any;
  private qrandomdata: any;
  private qcustomdata: any;
  private statuslist: any;
  private grouplist: any;
  private subjectlist: any;
  private timetypelist: any;
  private testdoexamtypelist: any;
  private courselist: any;
  private showresultlist: any;
  private approvelist: any;
  private testquestionlist: any;
  private testcustomordertypelist: any;

  id: string;
  inputForm: FormGroup;
  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute) {
    let name = new FormControl('', [Validators.required, Validators.maxLength(250)]);
    let status = new FormControl('', Validators.required);
    let groupid = new FormControl('', Validators.required);
    let subjectid = new FormControl('', Validators.required);
    let description = new FormControl('', [Validators.maxLength(1000)]);
    let timelimit = new FormControl('', Validators.required);
    let timelimittype = new FormControl('', Validators.required);
    let testdoexamtype = new FormControl('', Validators.required);
    let course = new FormControl('', Validators.required);
    let showresult = new FormControl('', Validators.required);
    let approvalstatus = new FormControl('', Validators.required);
    let testquestiontype = new FormControl('', Validators.required);
    let testcustomordertype = new FormControl('', Validators.required);
    let testcode = new FormControl('');
    let group = new FormControl('');
    let subject = new FormControl('');
    let approvalstatusname = new FormControl('');
    let questioncnt = new FormControl('');

    this.inputForm = new FormGroup({
      name: name,
      status: status,
      groupid: groupid,
      subjectid: subjectid,
      description: description,
      timelimit: timelimit,
      timelimittype: timelimittype,
      testdoexamtype: testdoexamtype,
      course: course,
      showresult: showresult,
      approvalstatus: approvalstatus,
      testquestiontype: testquestiontype,
      testcustomordertype: testcustomordertype,
      testcode: testcode,
      group: group,
      subject: subject,
      approvalstatusname: approvalstatusname,
      questioncnt: questioncnt,
    });

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.statuslist = this.appdata.getstatus();
    this.timetypelist = this.appdata.gettimetype();
    this.testdoexamtypelist = this.appdata.gettestdoexamtype();
    this.courselist = this.appdata.getcourse();
    this.showresultlist = this.appdata.getshowresult();
    this.approvelist = this.appdata.gettestapprovestatus();
    this.testquestionlist = this.appdata.gettestquestiontype();
    this.testcustomordertypelist = this.appdata.gettestcustomordertype();

    this.inputForm.patchValue({ status: "1" });
    this.inputForm.patchValue({ timelimittype: "1" });
    this.inputForm.patchValue({ showresult: "0" });
    this.inputForm.patchValue({ approvalstatus: "0" });
    this.inputForm.patchValue({ testdoexamtype: "0" });
    this.inputForm.patchValue({ course: "0" });
    this.inputForm.patchValue({ testquestiontype: "1" });
    this.inputForm.patchValue({ testcustomordertype: "0" });

    if (this.id != null && parseInt(this.id) > 0) {

      this.loading = true;
      var formdata = { id: this.id };
      this.service.httpClientGet("api/Test/gettest", formdata)
        .subscribe(result => {
          if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
            Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.router.navigate(['/test-search/']);
            this.loading = false;
          }
          else {
            if (result["result"] == 200) {
              this.data = result;
              this.inputForm.patchValue({ name: this.data.name });
              this.inputForm.patchValue({ status: this.data.status });
              this.inputForm.patchValue({ groupid: this.data.groupid });
              this.inputForm.patchValue({ subjectid: this.data.subjectid });
              this.inputForm.patchValue({ description: this.data.description });
              this.inputForm.patchValue({ timelimit: this.data.timelimit });
              this.inputForm.patchValue({ timelimittype: this.data.timelimittype });
              this.inputForm.patchValue({ course: this.data.course });
              this.inputForm.patchValue({ testdoexamtype: this.data.testdoexamtype });
              this.inputForm.patchValue({ showresult: this.data.showresult });
              this.inputForm.patchValue({ approvalstatus: this.data.approvalstatus });
              this.inputForm.patchValue({ testquestiontype: this.data.testquestiontype });
              this.inputForm.patchValue({ testcustomordertype: this.data.testcustomordertype });
              this.inputForm.patchValue({ testcode: this.data.testcode });
              this.inputForm.patchValue({ group: this.data.group });
              this.inputForm.patchValue({ subject: this.data.subject });
              this.inputForm.patchValue({ approvalstatusname: this.data.approvalstatusname });

              this.OnGroupList(false);
              this.OnSujectList(false);
              this.ChooseOnchange();
            }
            else {
              Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
              this.router.navigate(['/test-search/']);
            }
            this.loading = false;
          }
        }, error => {
            Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          this.loading = false;
        });
      this.OnQRandomSearch();
      this.OnQCustomSearch();
    }
    else {
      this.OnGroupList(true);
      this.ChooseOnchange();

    }
  }
  OnGroupChange() {
    this.OnSujectList(false);
    this.inputForm.patchValue({ subjectid: '' });
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
            }
          }

        }
      }, error => {
          Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });

      });
  }

  OnSubmit(gochild1,gochild2) {

    this.inputForm.controls['name'].markAsTouched();
    this.inputForm.controls['status'].markAsTouched();
    this.inputForm.controls['groupid'].markAsTouched();
    this.inputForm.controls['subjectid'].markAsTouched();
    this.inputForm.controls['description'].markAsTouched();
    this.inputForm.controls['timelimit'].markAsTouched();
    this.inputForm.controls['timelimittype'].markAsTouched();
    this.inputForm.controls['testdoexamtype'].markAsTouched();
    this.inputForm.controls['course'].markAsTouched();
    this.inputForm.controls['showresult'].markAsTouched();
    this.inputForm.controls['approvalstatus'].markAsTouched();
    this.inputForm.controls['testquestiontype'].markAsTouched();
    this.inputForm.controls['testcustomordertype'].markAsTouched();

    if (this.inputForm.valid) {
      let formdata = {
        ID: this.id,
        Name: this.inputForm.value.name,
        Status: this.inputForm.value.status,
        SubjectGroupID: this.inputForm.value.groupid,
        SubjectID: this.inputForm.value.subjectid,
        Description: this.inputForm.value.description,
        TimeLimit: this.inputForm.value.timelimit,
        TimeLimitType: this.inputForm.value.timelimittype,
        TestDoExamType: this.inputForm.value.testdoexamtype,
        Course: this.inputForm.value.course,
        ShowResult: this.inputForm.value.showresult,
        ApprovalStatus: this.inputForm.value.approvalstatus,
        TestQuestionType: this.inputForm.value.testquestiontype,
        TestCustomOrderType: this.inputForm.value.testcustomordertype,
      };
      this.loading = true;
      if (this.id != null && parseInt(this.id) > 0) {
        this.service.httpClientPost("api/Test/update", formdata)
          .subscribe(result => {
            if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
              Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            }
            else {
              if (result["result"] == 200) {
                this.router.navigate(['/test-search/']);
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
        this.service.httpClientPost("api/Test/insert", formdata)
          .subscribe(result => {
            if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
              Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            }
            else {
              if (result["result"] == 200) {
                if (gochild1 == true) {
                  this.router.navigate(['/test-qrandom/', result["id"], result["groupid"], result["subjectid"], 0]);
                }
                else if (gochild2 == true) {
                  this.router.navigate(['/test-qcustom/', result["id"], result["groupid"], result["subjectid"], 0]);
                }
                else {
                  this.router.navigate(['/test-search/']);
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
  ChooseOnchange() {
    if (this.inputForm.value.testquestiontype == '0') {
      $('#divcustom').hide();
      $('#divrandom').show();
    }
    else {
      $('#divrandom').hide();
      $('#divcustom').show();
    }
  }
           
  OnQRandomSearch() {
    var formdata = { id: this.id };
    this.service.httpClientGet("api/Test/listqrandom", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.qrandomdata = null;
        }
        else {
          this.qrandomdata = result;
        }
        this.loading = false;
      }, error => {
          Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
  }
         
  OnQRandomAdd() {
    if (this.id == null || parseInt(this.id) == 0) {
      Swal.fire({ text: 'หลังจากกดปุ่มตกลง ระบบจะบันทึกข้อมูลเข้าสู่ระบบ', type: 'info', showCancelButton: true, cancelButtonText: 'ยกเลิก', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-blue', cancelButton: 'btn btn-white' } }).then((result) => {
        if (result.value == true) {
          this.OnSubmit(true,false);
        }
      });
    }
    else {
      var groupid = this.inputForm.value.groupid;
      var subjectid = this.inputForm.value.subjectid;

      this.router.navigate(['/test-qrandom/', this.id, groupid, subjectid, 0]);
      return false;
    }
  }
  OnQRandomEdit(id) {
    var groupid = this.inputForm.value.groupid;
    var subjectid = this.inputForm.value.subjectid;

    this.router.navigate(["/test-qrandom/", this.id, groupid, subjectid, id]);
    return false;
  }
  OnQRandomDelete(id) {
    Swal.fire({ text: 'คุณต้องการที่จะลบรายการนี้', type: 'warning', showCancelButton: true, cancelButtonText: 'ยกเลิก', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-blue', cancelButton: 'btn btn-white' } }).then((result) => {
      if (result.value == true) {
        let deldata = { id: id };
        this.service.httpClientGet("api/Test/qrandomdelete", deldata)
          .subscribe(result => {
            this.OnQRandomSearch();
          }, error => {
            Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          });
      }
    });
    return false;
  }


  OnQCustomSearch() {
    var formdata = { id: this.id };
    this.service.httpClientGet("api/Test/listqcustom", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.qcustomdata = null;
          this.inputForm.patchValue({ questioncnt:0 });
        }
        else {
          this.qcustomdata = result["data"];
          this.inputForm.patchValue({ questioncnt: result["questioncnt"] });
        }
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }

  OnQCustomAdd() {
    if (this.id == null || parseInt(this.id) == 0) {
      Swal.fire({ text: 'หลังจากกดปุ่มตกลง ระบบจะบันทึกข้อมูลเข้าสู่ระบบ', type: 'info', showCancelButton: true, cancelButtonText: 'ยกเลิก', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-blue', cancelButton: 'btn btn-white' } }).then((result) => {
        if (result.value == true) {
          this.OnSubmit(false,true);
        }
      });
    }
    else {
      var groupid = this.inputForm.value.groupid;
      var subjectid = this.inputForm.value.subjectid;

      this.router.navigate(['/test-qcustom/', this.id, groupid, subjectid, 0]);
      return false;
    }
  }

  OnQCustomDelete(id) {
    Swal.fire({ text: 'คุณต้องการที่จะลบรายการนี้', type: 'warning', showCancelButton: true, cancelButtonText: 'ยกเลิก', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-blue', cancelButton: 'btn btn-white' } }).then((result) => {
      if (result.value == true) {
        let deldata = { id: id };
        this.service.httpClientGet("api/Test/qcustomdelete", deldata)
          .subscribe(result => {
            this.OnQCustomSearch();
          }, error => {
            Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          });
      }
    });
    return false;
  }

  OnQCustomMoveUp(id) {
    let formdata = { id: id };
    this.service.httpClientGet("api/Test/qcustommoveup", formdata)
      .subscribe(result => {
        this.OnQCustomSearch();
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
      });
    return false;
  }
  OnQCustomMoveDown(id) {
    let formdata = { id: id };
    this.service.httpClientGet("api/Test/qcustommovedown", formdata)
      .subscribe(result => {
        this.OnQCustomSearch();
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
      });
    return false;
  }

  OnApprove() {
    Swal.fire({ text: 'คุณต้องการเริ่มกระบวนการคัดเลือกแบบทดสอบ', type: 'warning', showCancelButton: true, cancelButtonText: 'ยกเลิก', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-blue', cancelButton: 'btn btn-white' } }).then((result) => {
      if (result.value == true) {
        let formdata = { id: this.id };
        this.service.httpClientGet("api/Test/approveconfirm", formdata)
          .subscribe(result => {
            Swal.fire({ text: 'ส่งคัดเลือกสำเร็จ', type: 'success', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.router.navigate(['/test-search/']);
          }, error => {
            Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          });
      }
    });
    return false;
  }
  getquestion(th, en) {
    var name = th;
    if (th == null || th == '')
      name = en;
    return this.service.convert_html_to_string(name,50);
  }
}
