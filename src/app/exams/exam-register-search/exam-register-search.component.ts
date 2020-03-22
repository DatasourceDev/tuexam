import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from "../../share/service/app.service";
import { SessionService } from '../../share/service/session.service';
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-exam-register-search',
  templateUrl: './exam-register-search.component.html',
  styleUrls: ['./exam-register-search.component.css'],
})
export class ExamRegisterSearchComponent implements OnInit {
  //@ViewChild('fileUploader', { static: true }) fileUploader
  public useraccesdata: any;

  public loading = false;
  private data: any;
  private studentdata: any;

  id: string;
  examdate: string;
  examperiod: string;
  subject: string;
  group: string;
  registercnt: number;
  file: File;     

  pageno: number = 1;
  pagelen: number = 0;
  itemcnt: number = 0;
  inputForm: FormGroup;

  constructor(public session: SessionService,private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute) {
    let fileupload = new FormControl();
    let examid = new FormControl('');
    let update_by = new FormControl('');
    
    this.inputForm = new FormGroup({
      examid: examid,
      fileupload: fileupload,
      update_by: update_by
    });
     let useracces = this.session.getData();
    this.useraccesdata = JSON.parse(useracces);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.inputForm.patchValue({ examid: this.id });

    let formdata = {};
    if (this.id != null && parseInt(this.id) > 0) {
      this.loading = true;
      formdata = { id: this.id };
      this.service.httpClientGet("api/Exam/getexam", formdata)
        .subscribe(result => {
          if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
            Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.router.navigate(['/exam-search/']);
            this.loading = false;
          }
          else {
            if (result["result"] == 200) {
              this.data = result;
              this.examdate = this.data.examdate;
              this.examperiod = this.data.examperiodname;
              this.subject = this.data.subject;
              this.group = this.data.group;
              this.registercnt = this.data.registercnt;
              this.OnSearch();
            }
            else {
              Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
              this.router.navigate(['/exam-search/']);
            }
            this.loading = false;
          }
        }, error => {
          this.loading = false;
        });
    }     
    this.ChooseOnchange('advance');
  }
  OnSearch() {
   let formdata = {
      exam_search: this.id,
      pageno: this.pageno
    };
    this.loading = true;

    this.service.httpClientGet("api/Exam/listAllregistered", formdata)
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
        this.loading = false;
      });
  }

  ChooseOnchange(value) {
    if (value == 'advance') {
      $('#divwalkin').hide();
      $('#divadvance').show();
    }
    else {
      $('#divadvance').hide();
      $('#divwalkin').show();
    }
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

    this.service.httpClientFilePost("api/Exam/upload", data)
      .subscribe(result => {
        Swal.fire({ text: 'นำเข้าสำเร็จ', type: 'success', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;       
        this.OnSearch();
        this.registercnt = result["registercnt"];
      }, error => {
        Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
  }

  OnDelete(id) {
    Swal.fire({ text: 'คุณต้องการที่จะลบรายการนี้', type: 'warning', showCancelButton: true, cancelButtonText: 'ยกเลิก', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-blue', cancelButton: 'btn btn-white' } }).then((result) => {
      if (result.value == true) {
        let deldata = { id: id };

        this.service.httpClientGet("api/Exam/registerdelete", deldata)
          .subscribe(result => {
            if (result["result"] != 200) {
              Swal.fire({ text: result["message"], type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            }
            else {
              this.OnSearch();
            }
          }, error => {
            Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          });
      }
    });
  }
  OnStudentSearch(txt) {
    let formdata = {
      text_search: txt,
      status_search:"1"
    };
    this.loading = true;

    this.service.httpClientGet("api/Student/listAllstudent", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.studentdata = null;
        }
        else {
          this.studentdata = result;
        }
        this.loading = false;
      }, error => {
        this.loading = false;
      });

  }
  OnChoose() {
    var choose = '';
    for (var i = 0; i < $('.chk').length; i++) {
      if ($('.chk').get(i).checked == true) {
        choose += $('.chk').get(i).value + ';';
      }
    }

    let formdata = {
      choose: choose,
      examid: this.id,
    };
    this.service.httpClientPost("api/Exam/uploadwalkin", formdata)
      .subscribe(result => {
        this.studentdata = null;
        this.OnSearch();
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
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
  OnMove(id) {
    this.router.navigate(['/exam-move/' + id]);
    return false;
  }

  OnDownloadTemplate() {
    this.service.openurl("template/register/register.xlsx");
    return false;
  }
  OnPageChange(no) {
    if (no < 1)
      no = 1;
    if (no > this.pagelen)
      no = this.pagelen;

    this.pageno = no;
    this.OnSearch();
    return false;
  }

  getPaginationArray() {
    var arr = [];
    for (var i = 1; i <= this.pagelen; i++) {
      arr.push(i);
    }
    return arr;
  }
  getStudentName(prefix,firstname, lastname, firstnameen, lastnameen) {
    var name = prefix;
    if (firstname != null && firstname != '') {
      name += firstname;
    }
    else if (firstnameen != null && firstnameen != '') {
      name += firstnameen;
    }

    if (lastname != null && lastname != '') {
      name += " "+ lastname;
    }
    else if (lastnameen != null && lastnameen != '') {
      name += " " + lastnameen;
    }
    return name;
  }

  getrowno(i) {
    var rowno = 0;
    if (this.pageno > 1) {
      rowno = ((this.pageno-1) * 25) + i +1;
    }
    else
      rowno = i + 1;
    return rowno;
  }

}
