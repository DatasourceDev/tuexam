import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-exam-setup',
  templateUrl: './exam-setup.component.html',
  styleUrls: ['./exam-setup.component.css']
})
export class ExamSetupComponent implements OnInit {
  public loading = false;
  private data: any;
  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute) {


  }

  ngOnInit() {
    this.OnSearch();
  }
  OnSearch() {
    this.loading = true;
    this.service.httpClientGet("api/ExamSetup/listexamsetup", null)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.data = null;
        }
        else {
          this.data = result;
        }
        this.loading = false;

      }, error => {
          Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
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
    };
    this.service.httpClientGet("api/ExamSetup/choose", formdata)
      .subscribe(result => {
        Swal.fire({ text: 'บันทึกข้อมูลสำเร็จ', type: 'success', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
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
}
