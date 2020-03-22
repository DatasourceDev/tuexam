import { Component, OnInit } from '@angular/core';
import { AppService } from "../../share/service/app.service";
import { SessionService } from '../../share/service/session.service';
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-question-search',
  templateUrl: './question-search.component.html',
  styleUrls: ['./question-search.component.css']
})
export class QuestionSearchComponent implements OnInit {
  public useraccesdata: any;

  public loading = false;
  private data: any;
  private statuslist: any;
  private grouplist: any;
  private subjectlist: any;
  private sublist: any;
  private levellist: any;
  private approvelist: any;
  private courselist: any;
  private qtypelist: any;
  
  pageno: number = 1;
  pagelen: number = 0;
  itemcnt : number = 0;

  inputForm: FormGroup;

  SearchFrom: FormGroup;

  constructor(public session: SessionService, private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router) {
    this.session.clean_session("text_search");
    this.session.clean_session("status_search");
    this.session.clean_session("group_search");
    this.session.clean_session("subject_search");
    this.session.clean_session("course_search");
    this.session.clean_session("sub_search");
    this.session.clean_session("level_search");
    this.session.clean_session("approve_search");
    this.session.clean_session("qtype_search");
    this.session.clean_session("from_search");
    this.session.clean_session("to_search");
    this.session.clean_session("pageno");

    let text_search = new FormControl(sessionStorage["text_search"], Validators.maxLength(1000));
    let status_search = new FormControl(sessionStorage["status_search"]);
    let group_search = new FormControl(sessionStorage["group_search"]);
    let subject_search = new FormControl(sessionStorage["subject_search"]);
    let course_search = new FormControl(sessionStorage["course_search"]);
    let sub_search = new FormControl(sessionStorage["sub_search"]);
    let level_search = new FormControl(sessionStorage["level_search"]);
    let approve_search = new FormControl(sessionStorage["approve_search"]);
    let qtype_search = new FormControl(sessionStorage["qtype_search"]);
    let from_search = new FormControl(sessionStorage["from_search"]);
    let to_search = new FormControl(sessionStorage["to_search"]);
    if (sessionStorage["pageno"] != null && sessionStorage["pageno"] != '')
      this.pageno = Number(sessionStorage["pageno"]);

    this.SearchFrom = new FormGroup({
      text_search: text_search,
      status_search: status_search,
      group_search: group_search,
      subject_search: subject_search,
      course_search: course_search  ,
      sub_search: sub_search,
      level_search: level_search,
      approve_search: approve_search,
      qtype_search: qtype_search,
      from_search: from_search,
      to_search: to_search,
    });

    let fileupload = new FormControl();
    let update_by = new FormControl();

    this.inputForm = new FormGroup({
      fileupload: fileupload,
      update_by: update_by,
    });

    let useracces = this.session.getData();
    this.useraccesdata = JSON.parse(useracces);
  }

  ngOnInit() {
    this.OnSubmit();
    this.statuslist = this.appdata.getstatus();
    this.levellist = this.appdata.getlevel();
    this.courselist = this.appdata.getcourse();
    this.approvelist = this.appdata.getapprovestatus();
    this.qtypelist = this.appdata.getquestiontype();
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

    this.service.httpClientGet("api/Question/listquestion", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.data = null;
          this.pagelen = 0;
        }
        else {
          this.data = result["data"];
          this.pagelen = result["pagelen"];
          this.itemcnt = result["itemcnt"]; 
        }
        this.loading = false;
      }, error => {
          Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
  }
  OnSubmitForm() {
    this.pageno = 1;
    this.OnSubmit();
  }
  OnSubmit() {
    var from_search = $('#from_search').val();
    var to_search = $('#to_search').val();
    this.SearchFrom.patchValue({ from_search: from_search });
    this.SearchFrom.patchValue({ to_search: to_search });

    let formdata = {
      text_search: this.SearchFrom.value.text_search,
      status_search: this.SearchFrom.value.status_search,
      group_search: this.SearchFrom.value.group_search,
      subject_search: this.SearchFrom.value.subject_search,
      course_search: this.SearchFrom.value.course_search,
      sub_search: this.SearchFrom.value.sub_search,
      level_search: this.SearchFrom.value.level_search,
      approve_search: this.SearchFrom.value.approve_search,
      qtype_search: this.SearchFrom.value.qtype_search,
      from_search: this.SearchFrom.value.from_search,
      to_search: this.SearchFrom.value.to_search,
      pageno: this.pageno,
    };
    sessionStorage.clear();
    sessionStorage["text_search"] = this.SearchFrom.value.text_search;
    sessionStorage["status_search"] = this.SearchFrom.value.status_search;
    sessionStorage["group_search"] = this.SearchFrom.value.group_search;
    sessionStorage["subject_search"] = this.SearchFrom.value.subject_search;
    sessionStorage["course_search"] = this.SearchFrom.value.course_search;
    sessionStorage["sub_search"] = this.SearchFrom.value.sub_search;
    sessionStorage["level_search"] = this.SearchFrom.value.level_search;
    sessionStorage["approve_search"] = this.SearchFrom.value.approve_search;
    sessionStorage["qtype_search"] = this.SearchFrom.value.qtype_search;
    sessionStorage["from_search"] = this.SearchFrom.value.from_search;
    sessionStorage["to_search"] = this.SearchFrom.value.to_search;
    sessionStorage["pageno"] = this.pageno;
    this.OnSearch(formdata);
  }
 
  OnEdit(questiontype, id) {
    if (questiontype == '1')
      this.router.navigate(["/question-multi-choice/", id,0]);
    else if (questiontype == '2')
      this.router.navigate(["/question-tf/", id, 0]);
    else if (questiontype == '3')
      this.router.navigate(["/question-multi-math/", id]);
    else if (questiontype == '4')
      this.router.navigate(["/question-short-ans/", id, 0]);
    else if (questiontype == '5')
      this.router.navigate(["/question-eassy/", id, 0]);
    else if (questiontype == '6')
      this.router.navigate(["/question-assigment/", id, 0]);
    else if (questiontype == '7')
      this.router.navigate(["/question-read-text-multi-choice/", id, 0]);
    else if (questiontype == '8')
      this.router.navigate(["/question-attitude/", id, 0]);

    return false;
  }
  OnDelete(id) {
    Swal.fire({ text: 'คุณต้องการที่จะลบรายการนี้', type: 'warning', showCancelButton: true, cancelButtonText: 'ยกเลิก', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-blue', cancelButton: 'btn btn-white' } }).then((result) => {
      if (result.value == true) {
        let deldata = { id: id };
        this.service.httpClientGet("api/Question/delete", deldata)
          .subscribe(result => {
            if (result["result"] == 200)
              this.OnSubmit();
            else
              Swal.fire({ text: result["message"], type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          }, error => {
            Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          });
      }
    });
    return false;
  }
  incomingfile(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.inputForm.get('fileupload').setValue({
          filename: file.name,
          filetype: file.type,
          value: (<string>reader.result).split(',')[1]
        })
      };
    }
  }
  OnUpload() {
    this.loading = true;
    this.inputForm.patchValue({ update_by: this.useraccesdata.username });

    let data = JSON.stringify(this.inputForm.value);

    this.service.httpClientFilePost("api/question/upload", data)
      .subscribe(result => {
        Swal.fire({ text: 'นำเข้าสำเร็จ', type: 'success', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
        this.OnSubmit();
      }, error => {
        Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
  }
  OnView(id) {
    this.router.navigate(["/question-view/", id]);
    return false;
  }

  OnApprove(id) {
    Swal.fire({ text: 'คุณต้องการเริ่มกระบวนการกลั่นกรองข้อสอบ', type: 'warning', showCancelButton: true, cancelButtonText: 'ยกเลิก', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-blue', cancelButton: 'btn btn-white' } }).then((result) => {
      if (result.value == true) {
        let formdata = { id: id };
        this.service.httpClientGet("api/Question/approveconfirm", formdata)
          .subscribe(result => {
            Swal.fire({ text: 'ส่งกลั่นกรองสำเร็จ', type: 'success', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.OnSubmit();
          }, error => {
            Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          });
      }
    });
    return false;
  }
  OnApproveAll() {
    Swal.fire({ text: 'คุณต้องการเริ่มกระบวนการกลั่นกรองข้อสอบ', type: 'warning', showCancelButton: true, cancelButtonText: 'ยกเลิก', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-blue', cancelButton: 'btn btn-white' } }).then((result) => {
      if (result.value == true) {
        this.loading = true;
        var choose = '';
        for (var i = 0; i < $('.chk').length; i++) {
          if ($('.chk').get(i).checked == true) {
            choose += $('.chk').get(i).value + ';';
          }
        }

        let formdata = {
          choose: choose
        };
        this.service.httpClientGet("api/Question/approveconfirmall", formdata)
          .subscribe(result => {
            this.OnSubmit();
            this.loading = false;
            $('#chkall').get(0).checked = false;
          }, error => {
              Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
              this.loading = false;
          });
      }
    });
   
    return false;
  }
  OnTestApproveMasterAll() {
    Swal.fire({ text: 'คุณต้องการเริ่มกระบวนการกลั่นกรองข้อสอบ', type: 'warning', showCancelButton: true, cancelButtonText: 'ยกเลิก', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-blue', cancelButton: 'btn btn-white' } }).then((result) => {
      if (result.value == true) {
        this.loading = true;

        var choose = '';
        for (var i = 0; i < $('.chk').length; i++) {
          if ($('.chk').get(i).checked == true) {
            choose += $('.chk').get(i).value + ';';
          }
        }

        let formdata = {
          choose: choose
        };
        this.service.httpClientGet("api/Question/approvedmasterall", formdata)
          .subscribe(result => {
            this.OnSubmit();
            this.loading = false;
            $('#chkall').get(0).checked = false;
          }, error => {
              Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
              this.loading = false;
          });
      }
    });
    return false;
  }
  OnTestRejectMasterAll() {
    Swal.fire({ text: 'คุณต้องการเริ่มกระบวนการกลั่นกรองข้อสอบ', type: 'warning', showCancelButton: true, cancelButtonText: 'ยกเลิก', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-blue', cancelButton: 'btn btn-white' } }).then((result) => {
      if (result.value == true) {
        this.loading = true;

        var choose = '';
        for (var i = 0; i < $('.chk').length; i++) {
          if ($('.chk').get(i).checked == true) {
            choose += $('.chk').get(i).value + ';';
          }
        }

        let formdata = {
          choose: choose
        };
        this.service.httpClientGet("api/Question/rejectedmasterall", formdata)
          .subscribe(result => {
            this.OnSubmit();
            this.loading = false;
            $('#chkall').get(0).checked = false;
          }, error => {
            Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.loading = false;
          });
      }
    });
    return false;
  }
  OnTestDraftMasterAll() {
    Swal.fire({ text: 'คุณต้องการเริ่มกระบวนการกลั่นกรองข้อสอบ', type: 'warning', showCancelButton: true, cancelButtonText: 'ยกเลิก', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-blue', cancelButton: 'btn btn-white' } }).then((result) => {
      if (result.value == true) {
        this.loading = true;

        var choose = '';
        for (var i = 0; i < $('.chk').length; i++) {
          if ($('.chk').get(i).checked == true) {
            choose += $('.chk').get(i).value + ';';
          }
        }

        let formdata = {
          choose: choose
        };
        this.service.httpClientGet("api/Question/draftmasterall", formdata)
          .subscribe(result => {
            this.OnSubmit();
            this.loading = false;
            $('#chkall').get(0).checked = false;
          }, error => {
            Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.loading = false;
          });
      }
    });
    return false;
  }
  OnCheckAll() {
    if ($('#chkall').get(0).checked == true) {
      for (var i = 0; i < $('.chk').length; i++) {
        $('.chk').get(i).checked = true;
      }
    }
    else {
      for (var i = 0; i < $('.chk').length; i++) {
        $('.chk').get(i).checked = false;
      }
    }
  }
  OnDownloadTemplate() {
    this.service.openurl("template/question/example.zip");
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

  getCourse(th, en) {
    if (th == true && en == true)
      return "ไทย, อังกฤษ";
    else if (th == true)
      return "ไทย";
    else if (en == true)
      return "อังกฤษ";
  }
  getQuestionType(type) {
    if (type == 1) {
      return "Multiple Choice";
    }
    else if(type == 2) {
      return "True-False";
    }
    else if (type == 3) {
      return "Multiple Matching";
    }
    else if (type == 4) {
      return "Short Answer";
    }
    else if (type == 5) {
      return "Essay";
    }
    else if (type == 6) {
      return "Assignment";
    }
    else if (type == 7) {
      return "Reading Text And Multiple Choice";
    }
    else if (type == 8) {
      return "Attitude";
    }

    return "";
  }

  getquestion(th, en) {
    var name = th;
    if (th == null || th == '')
      name = en;
    return this.service.convert_html_to_string(name,20);
  }
}
