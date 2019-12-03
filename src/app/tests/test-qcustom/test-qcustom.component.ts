import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-test-qcustom',
  templateUrl: './test-qcustom.component.html',
  styleUrls: ['./test-qcustom.component.css']
})
export class TestQcustomComponent implements OnInit {
  public loading = false;
  private data: any;
  id: string;
  tid: string;
  gid: string;
  sid: string;
  pageno: number = 1;
  pagelen: number = 0;
  SearchFrom: FormGroup;
  private sublist: any;
  private levellist: any;

  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute) {
    let text_search = new FormControl('', Validators.maxLength(1000));
    let status_search = new FormControl('');
    let group_search = new FormControl('');
    let subject_search = new FormControl('');
    let sub_search = new FormControl('');
    let level_search = new FormControl('');

    this.SearchFrom = new FormGroup({
      text_search: text_search,
      status_search: status_search,
      group_search: group_search,
      subject_search: subject_search,
      sub_search: sub_search,
      level_search: level_search,
    });
  }

  ngOnInit() {
    this.levellist = this.appdata.getlevel();

    this.tid = this.route.snapshot.params['tid'];
    this.gid = this.route.snapshot.params['gid'];
    this.sid = this.route.snapshot.params['sid'];
    this.id = this.route.snapshot.params['id'];

    this.SearchFrom.patchValue({ group_search: this.gid });
    this.SearchFrom.patchValue({ subject_search: this.sid });

    let formdata = {
      pageno: this.pageno,
      status_search : "1",
      group_search: this.gid,
      subject_search: this.sid,
      test_filter: this.tid,
    };
    this.OnSearch(formdata);
    this.OnSubList();
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
  OnSubList() {
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

  OnSubmit() {
    let formdata = {
      text_search: this.SearchFrom.value.text_search,
      status_search: this.SearchFrom.value.status_search,
      group_search: this.SearchFrom.value.group_search,
      subject_search: this.SearchFrom.value.subject_search,
      sub_search: this.SearchFrom.value.sub_search,
      level_search: this.SearchFrom.value.level_search,
      pageno: this.pageno,
    };
    this.OnSearch(formdata);
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
      tid: this.tid,
    };
    this.service.httpClientGet("api/Test/chooseqcustom", formdata)
      .subscribe(result => {
        this.router.navigate(["/test/", this.tid]);
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
      });
    return false;
  }
  OnBack() {
    this.router.navigate(['/test/', this.tid]);
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
