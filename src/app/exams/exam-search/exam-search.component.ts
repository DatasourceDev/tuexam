import { Component, OnInit } from '@angular/core';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2'; 
declare var $: any;

@Component({
  selector: 'app-exam-search',
  templateUrl: './exam-search.component.html',
  styleUrls: ['./exam-search.component.css']
})
export class ExamSearchComponent implements OnInit {
  public loading = false;
  private data: any;
  private statuslist: any;
  private grouplist: any;
  private subjectlist: any;

  pageno: number = 1;
  pagelen: number = 0;

  SearchFrom: FormGroup;

  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router) {
    let text_search = new FormControl('', Validators.maxLength(1000));
    let from_search = new FormControl('');
    let to_search = new FormControl('');
    let group_search = new FormControl('');
    let subject_search = new FormControl('');

    this.SearchFrom = new FormGroup({
      text_search: text_search,
      from_search: from_search,
      to_search: to_search,
      group_search: group_search,
      subject_search: subject_search
    });
  }

  ngOnInit() {
    let formdata = { pageno: this.pageno };
    this.OnSearch(formdata);
    this.statuslist = this.appdata.getstatus();
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
  OnSearch(formdata) {
    this.loading = true;

    this.service.httpClientGet("api/Exam/listexam", formdata)
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
    var from_search = $('#from_search').val();
    var to_search = $('#to_search').val();
    this.SearchFrom.patchValue({ from_search: from_search });
    this.SearchFrom.patchValue({ to_search: to_search });

    let formdata = {
      text_search: this.SearchFrom.value.text_search,
      from_search: this.SearchFrom.value.from_search,
      to_search: this.SearchFrom.value.to_search,
      group_search: this.SearchFrom.value.group_search,
      subject_search: this.SearchFrom.value.subject_search,
      pageno: this.pageno,
    };
    this.OnSearch(formdata);
  }

  OnView(id) {
    this.router.navigate(['/exam-view/', id]);
  }
  OnEdit(id) {
    this.router.navigate(['/exam/', id]);
  }
  OnDelete(id) {
    Swal.fire({ text: 'คุณต้องการที่จะลบรายการนี้', type: 'warning', showCancelButton: true, cancelButtonText: 'ยกเลิก', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-blue', cancelButton: 'btn btn-white' } }).then((result) => {
      if (result.value == true) {
        let deldata = { id: id };

        this.service.httpClientGet("api/Exam/delete", deldata)
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

  OnRegister(id) {
    this.router.navigate(['/exam-register-search/', id]);
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
}
