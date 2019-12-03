import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  public loading = false;

  private data: any;
  private statuslist: any;
  private prefixlist: any;
  id: string;

  inputForm: FormGroup;

  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute) {
    let userid = new FormControl('');
    let username = new FormControl('');
    let firstname = new FormControl('', [Validators.required, Validators.maxLength(250)]);
    let lastname = new FormControl('', [Validators.required, Validators.maxLength(250)]);
    let prefix = new FormControl('', Validators.required);
    let status = new FormControl('', Validators.required);
    let idcard = new FormControl('', [Validators.required, Validators.maxLength(14)]);
    let email = new FormControl('', [Validators.maxLength(100),Validators.email]);
    let phone = new FormControl('',  Validators.maxLength(50));
    let opendate = new FormControl('');
    let expirydate = new FormControl('');
    
    this.inputForm = new FormGroup({
      userid: userid,
      username: username,
      firstname: firstname,
      lastname: lastname,
      status: status,
      prefix: prefix,
      idcard: idcard,
      email: email,
      phone: phone,
      opendate: opendate,
      expirydate: expirydate,
    });
  }

  ngOnInit() {
    this.statuslist = this.appdata.getstatus();
    this.prefixlist = this.appdata.getprefix();

    this.id = this.route.snapshot.params['id'];
    this.inputForm.patchValue({ status: "1" });
    this.inputForm.patchValue({ prefix: "0" });
    //$('#status').val("1" ).trigger('change');
    //$('#prefix').val("0").trigger('change');

    if (this.id != null && parseInt(this.id) > 0) {
      this.loading = true;
      var formdata = { id: this.id };
      this.service.httpClientGet("api/Staff/getstaff", formdata)
        .subscribe(result => {
          if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
            Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.router.navigate(['/staff-search/']);
            this.loading = false;
          }
          else {
            if (result["result"] == -101) {
              Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
              this.router.navigate(['/staff-search/']);
            }
            else {
              this.data = result;
              this.inputForm.patchValue({ userid: this.data.userid });
              this.inputForm.patchValue({ username: this.data.username });
              this.inputForm.patchValue({ firstname: this.data.firstname });
              this.inputForm.patchValue({ lastname: this.data.lastname });
              this.inputForm.patchValue({ status: this.data.status });
              this.inputForm.patchValue({ prefix: this.data.prefix });
              this.inputForm.patchValue({ idcard: this.data.idcard });
              this.inputForm.patchValue({ email: this.data.email });
              this.inputForm.patchValue({ phone: this.data.phone });
              this.inputForm.patchValue({ opendate: this.data.opendate });
              this.inputForm.patchValue({ expirydate: this.data.expirydate });

              //$('#status').val(this.data.status).trigger('change');
              //$('#prefix').val(this.data.prefix).trigger('change');
            }
            this.loading = false;
          }
        }, error => {
            this.loading = false;
        });
    }
  }

  OnSubmit() {
    var opendate = $('#opendate').val();
    var expirydate = $('#expirydate').val();
    //var status = $('#status').val();
    //var prefix = $('#prefix').val();
    this.inputForm.patchValue({ opendate: opendate });
    this.inputForm.patchValue({ expirydate: expirydate });
    //this.inputForm.patchValue({ status: status });
    //this.inputForm.patchValue({ prefix: prefix });

    this.inputForm.controls['firstname'].markAsTouched();
    this.inputForm.controls['lastname'].markAsTouched();
    this.inputForm.controls['status'].markAsTouched();
    this.inputForm.controls['prefix'].markAsTouched();
    this.inputForm.controls['idcard'].markAsTouched();
    this.inputForm.controls['email'].markAsTouched();
    this.inputForm.controls['phone'].markAsTouched();
    this.inputForm.controls['opendate'].markAsTouched();
    this.inputForm.controls['expirydate'].markAsTouched();
    if (this.inputForm.valid) {
      let formdata = {
        id: this.id,
        firstname: this.inputForm.value.firstname,
        lastname: this.inputForm.value.lastname,
        status: this.inputForm.value.status,
        prefix: this.inputForm.value.prefix,
        idcard: this.inputForm.value.idcard,
        email: this.inputForm.value.email,
        phone: this.inputForm.value.phone,
        opendate: this.inputForm.value.opendate,
        expirydate: this.inputForm.value.expirydate,
        username: this.inputForm.value.username,
        userid: this.inputForm.value.userid,
      };
      this.loading = true;
      if (this.id != null && parseInt(this.id) > 0) {
        this.service.httpClientPost("api/Staff/update", formdata)
          .subscribe(result => {
            if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
              Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            }
            else {
              if (result["result"] == 200) {
                this.router.navigate(['/staff-search/']);
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
      else {
        this.service.httpClientPost("api/Staff/insert", formdata)
          .subscribe(result => {
            if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
              Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            }
            else {
              if (result["result"] == 200) {
                this.router.navigate(['/staff-search/']);
              }
              else {
                Swal.fire({ text: result["message"], type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
              };
            }
            this.loading = false;
          }, error => {
              Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
              this.loading = false;
          });
      }
    }
  }

  OnReset() {
    if (this.id != null && parseInt(this.id) > 0) {
      this.router.navigate(['/reset-password/', this.id]);
    }
  }
}
