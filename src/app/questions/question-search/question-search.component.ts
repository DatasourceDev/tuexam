import { Component, OnInit } from '@angular/core';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-question-search',
  templateUrl: './question-search.component.html',
  styleUrls: ['./question-search.component.css']
})
export class QuestionSearchComponent implements OnInit {
  public loading = false;
  private data: any;
  private statuslist: any;
  private grouplist: any;
  private subjectlist: any;
  private sublist: any;
  private levellist: any;
  private approvelist: any;
  private courselist: any;

  pageno: number = 1;
  pagelen: number = 0;

  SearchFrom: FormGroup;
  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router) {
    let text_search = new FormControl('', Validators.maxLength(1000));
    let status_search = new FormControl('');
    let group_search = new FormControl('');
    let subject_search = new FormControl('');
    let course_search = new FormControl('');
    let sub_search = new FormControl('');
    let level_search = new FormControl('');
    let approve_search = new FormControl('');

    this.SearchFrom = new FormGroup({
      text_search: text_search,
      status_search: status_search,
      group_search: group_search,
      subject_search: subject_search,
      course_search: course_search  ,
      sub_search: sub_search,
      level_search: level_search,
      approve_search: approve_search,
    });

  }

  ngOnInit() {
    let formdata = { pageno: this.pageno };
    this.OnSearch(formdata);
    this.statuslist = this.appdata.getstatus();
    this.levellist = this.appdata.getlevel();
    this.courselist = this.appdata.getcourse();
    this.approvelist = this.appdata.getapprovestatus();
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
        }
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }
  OnSubmit() {
    let formdata = {
      text_search: this.SearchFrom.value.text_search,
      status_search: this.SearchFrom.value.status_search,
      group_search: this.SearchFrom.value.group_search,
      subject_search: this.SearchFrom.value.subject_search,
      course_search: this.SearchFrom.value.course_search,
      lang_search: this.SearchFrom.value.lang_search,
      sub_search: this.SearchFrom.value.sub_search,
      level_search: this.SearchFrom.value.level_search,
      approve_search: this.SearchFrom.value.approve_search,
      pageno: this.pageno,
    };
    this.OnSearch(formdata);
  }
  OnEdit(questiontype, id) {
    if (questiontype == '1')
      this.router.navigate(["/question-multi-choice/", id]);
    else if (questiontype == '2')
      this.router.navigate(["/question-tf/", id]);
    else if (questiontype == '3')
      this.router.navigate(["/question-multi-math/, id"]);
    else if (questiontype == '4')
      this.router.navigate(["/question-short-ans/, id"]);
    else if (questiontype == '5')
      this.router.navigate(["/question-eassy/, id"]);
    else if (questiontype == '6')
      this.router.navigate(["/question-assigment/, id"]);
    else if (questiontype == '7')
      this.router.navigate(["/question-read-text-multi-choice/, id"]);
    else if (questiontype == '8')
      this.router.navigate(["/question-attitude/, id"]);
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
    return this.convert_html_to_string(name);
  }
  convert_html_to_string(html) {
    if (html == null)
      return "";
    var result = html.replace(/(<([^>]+)>)/g, "");
    if (result.length > 20) {
      result = result.substring(0, 20) + ' ...';
    }
    return result;
  }
}
