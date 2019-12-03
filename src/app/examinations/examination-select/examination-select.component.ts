import { Component, OnInit } from '@angular/core';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { Router } from '@angular/router';
import { SessionService } from '../../share/service/session.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2'; 
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-examination-select',
  templateUrl: './examination-select.component.html',
  styleUrls: ['./examination-select.component.css']
})
export class ExaminationSelectComponent implements OnInit {
  public loading = false;
  private data: any;
  public useraccesdata: any;

  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, public session: SessionService) { }

  ngOnInit() {
    let useracces = this.session.getData();
    this.useraccesdata = JSON.parse(useracces);

    this.OnSearch();
  }
  OnSearch() {
    var currentDate = formatDate(new Date(), 'dd/MM/yyyy', 'en');

    let formdata = {
      student_search: this.useraccesdata.studentid,
      date_search: currentDate,
    };
    this.loading = true;

    this.service.httpClientGet("api/TestResult/inittestresultstudent", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.data = null;
        }
        else {
          this.data = result;
        }
        this.loading = false;

      }, error => {
        this.loading = false;

      });
  }

  OnStart(id) {
    let formdata = {
      id: id                 
    };
    this.loading = true;
    this.service.httpClientGet("api/TestResult/start", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        }
        else {
          if (result["result"] == 200) {
            this.router.navigate(['/examination/', id, result["index"]]);
          }
          else {
            Swal.fire({ text: result["message"], type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          }
        }
        this.loading = false;
      }, error => {
        Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
  }
  OnLogout() {
    this.session.logOut();
    this.router.navigate(["/login-student"]);
    return false;
  }
}
