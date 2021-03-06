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
  selector: 'app-student-search',
  templateUrl: './student-search.component.html',
  styleUrls: ['./student-search.component.css']
})
export class StudentSearchComponent implements OnInit {

  public loading = false;
  private data: any;
  private statuslist: any;
  private facultylist: any;
  private courselist: any;

  pageno: number = 1;
  pagelen: number = 0;
  itemcnt: number = 0;

  SearchFrom: FormGroup;
  inputForm: FormGroup;

  constructor(public session: SessionService,private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router) {
    this.session.clean_session("text_search");
    this.session.clean_session("status_search");
    this.session.clean_session("course_search");
    this.session.clean_session("faculty_search");

    let text_search = new FormControl(sessionStorage["text_search"], Validators.maxLength(1000));
    let status_search = new FormControl(sessionStorage["status_search"]);
    let course_search = new FormControl(sessionStorage["course_search"]);
    let faculty_search = new FormControl(sessionStorage["faculty_search"]);
    if (sessionStorage["pageno"] != null && sessionStorage["pageno"] != '')
      this.pageno = Number(sessionStorage["pageno"]);

    this.SearchFrom = new FormGroup({
      text_search: text_search,
      status_search: status_search,
      course_search: course_search,
      faculty_search: faculty_search,
    });

    let fileupload = new FormControl();

    this.inputForm = new FormGroup({
      fileupload: fileupload,
    });
  }

  ngOnInit() {
    this.OnSubmit();
    this.statuslist = this.appdata.getstatus();
    this.courselist = this.appdata.getcourse();
    this.OnFacultyList();
  }
  OnSearch(formdata) {
    this.loading = true;

    this.service.httpClientGet("api/Student/liststudent", formdata)
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
  OnFacultyList() {
    this.service.httpClientGet("api/Faculty/listActivefaculty", null)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.facultylist = null;
        }
        else {
          this.facultylist = result;
        }
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
      });
  }
  OnSubmitForm() {
    this.pageno = 1;
    this.OnSubmit();
  }
  OnSubmit() {
    let formdata = {
      text_search: this.SearchFrom.value.text_search,
      status_search: this.SearchFrom.value.status_search,
      course_search: this.SearchFrom.value.course_search,
      faculty_search: this.SearchFrom.value.faculty_search,
      pageno: this.pageno,
    };
    sessionStorage.clear();
    sessionStorage["text_search"] = this.SearchFrom.value.text_search;
    sessionStorage["status_search"] = this.SearchFrom.value.status_search;
    sessionStorage["course_search"] = this.SearchFrom.value.course_search;
    sessionStorage["faculty_search"] = this.SearchFrom.value.faculty_search;
    sessionStorage["pageno"] = this.pageno;
    this.OnSearch(formdata);
  }
  OnEdit(id) {
    this.router.navigate(['/student/', id]);
  }
  OnDelete(id) {
    Swal.fire({ text: 'คุณต้องการที่จะลบรายการนี้', type: 'warning', showCancelButton: true, cancelButtonText: 'ยกเลิก', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-blue', cancelButton: 'btn btn-white' } }).then((result) => {
      if (result.value == true) {
        let deldata = { id: id };
        this.service.httpClientGet("api/Student/delete", deldata)
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

    let data = JSON.stringify(this.inputForm.value);

    this.service.httpClientFilePost("api/student/upload", data)
      .subscribe(result => {
        this.loading = false;
        this.OnSubmit();        
      }, error => {
        Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
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
  OnDownloadTemplate() {
    this.service.openurl("template/student.xlsx");
    return false;
  }
}
