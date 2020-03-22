import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-send-result-setup',
  templateUrl: './send-result-setup.component.html',
  styleUrls: ['./send-result-setup.component.css']
})
export class SendResultSetupComponent implements OnInit {

  public loading = false;
  private data: any;
  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute) {


  }

  ngOnInit() {
    this.OnSearch();
  }
  OnSearch() {
    this.loading = true;
    this.service.httpClientGet("api/SendResultSetup/listsendresultsetup", null)
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

  OnSubmit() {
    var formdata = [];
    for (var i = 0; i < this.data.length; i++) {
      var sendbyemail = false;
      if ($('.sendbyemail').get(i).checked == true) {
        sendbyemail = true;
      }
      var sendbypost = false;
      if ($('.sendbypost').get(i).checked == true) {
        sendbypost = true;
      }
      var other = false;
      if ($('.other').get(i).checked == true) {
        other = true;
      }
      var arr = {
        ID: this.data[i].id,
        SubjectGroupID: this.data[i].groupid,
        SubjectID: this.data[i].subjectid, 
        Description: $('.desc').get(i).value, 
        SendByEmail: sendbyemail,
        SendByPost: sendbypost,
        Other: other,
      }
      formdata.push(arr);
    }     
   
    this.service.httpClientPost("api/SendResultSetup/modify", formdata)
      .subscribe(result => {
        Swal.fire({ text: 'บันทึกข้อมูลสำเร็จ', type: 'success', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
      });
    return false;
  }
}
