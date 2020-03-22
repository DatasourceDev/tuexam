import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from "../../share/service/app.service";
import { SessionService } from '../../share/service/session.service';
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-test-view',
  templateUrl: './test-view.component.html',
  styleUrls: ['./test-view.component.css']
})
export class TestViewComponent implements OnInit {
  public useraccesdata: any;

  public loading = false;
  private data: any;
  private qrandomdata: any;
  private qcustomdata: any;
  private appstaffdata: any;
  id: string;
  inputForm: FormGroup;
  isapproval: boolean;

  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute, public session: SessionService) {
    let useracces = this.session.getData();
    this.useraccesdata = JSON.parse(useracces);

    let name = new FormControl('', [Validators.required, Validators.maxLength(250)]);
    let status = new FormControl('', Validators.required);
    let statusname = new FormControl('');
    let groupid = new FormControl('', Validators.required);
    let subjectid = new FormControl('', Validators.required);
    let description = new FormControl('', [Validators.maxLength(1000)]);
    let timelimit = new FormControl('', Validators.required);
    let timelimittype = new FormControl('', Validators.required);
    let timelimittypename = new FormControl('');
    let testdoexamtype = new FormControl('', Validators.required);
    let testdoexamtypename = new FormControl('');
    let course = new FormControl('', Validators.required);
    let coursename = new FormControl('');
    let showresult = new FormControl('', Validators.required);
    let showresultname = new FormControl('');
    let approvalstatus = new FormControl('', Validators.required);
    let approvalstatusname = new FormControl('');
    let testquestiontype = new FormControl('', Validators.required);
    let testquestiontypename = new FormControl('');
    let testcustomordertype = new FormControl('', Validators.required);
    let testcustomordertypename = new FormControl('');
    let testcode = new FormControl('');
    let group = new FormControl('');
    let subject = new FormControl('');
    let remark = new FormControl('');
    let approveremark = new FormControl('');
    let questioncnt = new FormControl('');
    
    this.inputForm = new FormGroup({
      name: name,
      status: status,
      statusname: statusname,
      groupid: groupid,
      subjectid: subjectid,
      description: description,
      timelimit: timelimit,
      timelimittype: timelimittype,
      testdoexamtype: testdoexamtype,
      course: course,
      showresult: showresult,
      showresultname: showresultname,
      approvalstatus: approvalstatus,
      testquestiontype: testquestiontype,
      testcustomordertype: testcustomordertype,
      testcode: testcode,
      group: group,
      subject: subject,
      approvalstatusname: approvalstatusname,
      timelimittypename: timelimittypename,
      testdoexamtypename: testdoexamtypename,
      coursename: coursename,
      testquestiontypename: testquestiontypename,
      testcustomordertypename: testcustomordertypename,
      remark: remark,  
      approveremark: approveremark,
      questioncnt: questioncnt,
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
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
              this.data = result;
              this.inputForm.patchValue({ name: this.data.name });
              this.inputForm.patchValue({ status: this.data.status });
              this.inputForm.patchValue({ statusname: this.data.statusname });
              this.inputForm.patchValue({ groupid: this.data.groupid });
              this.inputForm.patchValue({ subjectid: this.data.subjectid });
              this.inputForm.patchValue({ description: this.data.description });
              this.inputForm.patchValue({ timelimit: this.data.timelimit });
              this.inputForm.patchValue({ timelimittype: this.data.timelimittype });
              this.inputForm.patchValue({ timelimittypename: this.data.timelimittypename });
              this.inputForm.patchValue({ course: this.data.course });
              this.inputForm.patchValue({ coursename: this.data.coursename });
              this.inputForm.patchValue({ testdoexamtype: this.data.testdoexamtype });
              this.inputForm.patchValue({ testdoexamtypename: this.data.testdoexamtypename });
              this.inputForm.patchValue({ showresult: this.data.showresult });
              this.inputForm.patchValue({ showresultname: this.data.showresultname });
              this.inputForm.patchValue({ approvalstatus: this.data.approvalstatus });
              this.inputForm.patchValue({ approvalstatusname: this.data.approvalstatusname });
              this.inputForm.patchValue({ testquestiontype: this.data.testquestiontype });
              this.inputForm.patchValue({ testquestiontypename: this.data.testquestiontypename });
              this.inputForm.patchValue({ testcustomordertype: this.data.testcustomordertype });
              this.inputForm.patchValue({ testcustomordertypename: this.data.testcustomordertypename });
              this.inputForm.patchValue({ testcode: this.data.testcode });
              this.inputForm.patchValue({ group: this.data.group });
              this.inputForm.patchValue({ subject: this.data.subject });
              this.inputForm.patchValue({ remark: this.data.remark });
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
      this.OnApprStaffSearch();
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

  OnQCustomSearch() {
    var formdata = { id: this.id };
    this.service.httpClientGet("api/Test/listqcustom", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.qcustomdata = null;
          this.inputForm.patchValue({ questioncnt: 0 });
        }
        else {                       
          this.qcustomdata = result["data"];
          this.inputForm.patchValue({ questioncnt: result["questioncnt"]});

        }
        this.loading = false;
      }, error => {
        this.loading = false;
      });
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

  OnApprStaffSearch() {
    this.isapproval = false;
    var formdata = { id: this.id };
    this.service.httpClientGet("api/Test/listapprstaff", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.appstaffdata = null;
        }
        else {
          this.appstaffdata = result;
          for (var i = 0; i < this.appstaffdata.length; i++) {
            if (this.appstaffdata[i].staffid == this.useraccesdata.staffid) {
              if (this.appstaffdata[i].approvalstatus <= 1) {
                this.isapproval = true;
                break;
              }
            }
          }
        }
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }

  OnTestApprove() {
    this.loading = true;
    let formdata = {
      staffid: this.useraccesdata.staffid,
      id: this.id,
      remark: this.inputForm.value.approveremark,
    };
    this.service.httpClientGet("api/Test/approved", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
        }
        else {
          if (result["result"] == 200) {
            Swal.fire({ text: 'บันทึกข้อมูลสำเร็จ', type: 'success', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.router.navigate(['/test-search/']);
          }
        }
        this.loading = false;
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
    return false;
  }
  OnTestReject() {
    this.loading = true;
    let formdata = {
      staffid: this.useraccesdata.staffid,
      id: this.id,
      remark: this.inputForm.value.approveremark,
    };
    this.service.httpClientGet("api/Test/rejected", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
        }
        else {
          if (result["result"] == 200) {
            Swal.fire({ text: 'บันทึกข้อมูลสำเร็จ', type: 'success', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.router.navigate(['/test-search/']);
          }
        }
        this.loading = false;
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
    return false;
  }
    
  OnTestApproveMaster() {
    this.loading = true;
    let formdata = {
      staffid: this.useraccesdata.staffid,
      id: this.id,
    };
    this.service.httpClientGet("api/Test/approvedmaster", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
        }
        else {
          if (result["result"] == 200) {
            Swal.fire({ text: 'บันทึกข้อมูลสำเร็จ', type: 'success', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.router.navigate(['/test-search/']);
          }
        }
        this.loading = false;
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
    return false;
  }
  OnTestRejectMaster() {
    this.loading = true;
    let formdata = {
      staffid: this.useraccesdata.staffid,
      id: this.id,
    };
    this.service.httpClientGet("api/Test/rejectedmaster", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
        }
        else {
          if (result["result"] == 200) {
            Swal.fire({ text: 'บันทึกข้อมูลสำเร็จ', type: 'success', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.router.navigate(['/test-search/']);
          }
        }
        this.loading = false;
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
    return false;
  }
  OnTestDraftMaster() {
    this.loading = true;
    let formdata = {
      staffid: this.useraccesdata.staffid,
      id: this.id,
    };
    this.service.httpClientGet("api/Test/draftmaster", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
        }
        else {
          if (result["result"] == 200) {
            Swal.fire({ text: 'บันทึกข้อมูลสำเร็จ', type: 'success', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.router.navigate(['/test-search/']);
          }
        }
        this.loading = false;
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
    return false;
  }
  OnChangeStatus() {
    this.loading = true;
    let formdata = {
      id: this.id,
    };
    this.service.httpClientGet("api/Test/changestatus", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
        }
        else {
          if (result["result"] == 200) {
            Swal.fire({ text: 'เปลี่ยนสถานะสำเร็จ', type: 'success', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.inputForm.patchValue({ status: result["status"] });
            this.inputForm.patchValue({ statusname: result["statusname"] });
          }
        }
        this.loading = false;
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
    return false;
  }
  getquestion(th, en) {
    var name = th;
    if (th == null || th == '')
      name = en;
    return this.service.convert_html_to_string(name, 70);
  }
}
