import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  public loading = false;

  private data: any;
  private statuslist: any;
  private prefixlist: any;
  private courselist: any;

  id: string;

  inputForm: FormGroup;
  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute) {
    let userid = new FormControl('');
    let username = new FormControl('');
    let firstname = new FormControl('', [Validators.maxLength(250)]);
    let lastname = new FormControl('', [ Validators.maxLength(250)]);
    let prefix = new FormControl('', Validators.required);
    let status = new FormControl('', Validators.required);
    let idcard = new FormControl('', [Validators.required, Validators.maxLength(14)]);
    let email = new FormControl('', [Validators.maxLength(100), Validators.email]);
    let phone = new FormControl('', Validators.maxLength(50));
    let firstnameen = new FormControl('', [Validators.maxLength(250)]);
    let lastnameen = new FormControl('', [Validators.maxLength(250)])
    let passport = new FormControl('', [Validators.maxLength(50)])
    let address = new FormControl('', [Validators.maxLength(50)])
    let faculty = new FormControl('');
    let course = new FormControl('');
    let studentcode = new FormControl('');

    this.inputForm = new FormGroup({
      userid: userid,
      username: username,
      firstname: firstname,
      lastname: lastname,
      firstnameen: firstnameen,
      lastnameen: lastnameen,
      status: status,
      prefix: prefix,
      idcard: idcard,
      email: email,
      phone: phone,
      passport: passport,
      address: address,
      faculty: faculty,
      course: course,
      studentcode: studentcode
    });
  }


  ngOnInit() {
    this.statuslist = this.appdata.getstatus();
    this.prefixlist = this.appdata.getprefix();
    this.courselist = this.appdata.getcourse();

    this.id = this.route.snapshot.params['id'];
    this.inputForm.patchValue({ status: "1" });
    this.inputForm.patchValue({ prefix: "0" });

    if (this.id != null && parseInt(this.id) > 0) {
      this.loading = true;
      var formdata = { id: this.id };
      this.service.httpClientGet("api/Student/getstudent", formdata)
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
              this.inputForm.patchValue({ faculty: this.data.faculty });
              this.inputForm.patchValue({ course: this.data.course });
              this.inputForm.patchValue({ studentcode: this.data.studentcode });
              this.inputForm.patchValue({ address: this.data.address });
              this.inputForm.patchValue({ lastnameen: this.data.lastnameen });
              this.inputForm.patchValue({ firstnameen: this.data.firstnameen });

            }
            this.loading = false;
          }
        }, error => {
          this.loading = false;
        });
    }
  }

  OnSubmit() {
    this.inputForm.controls['firstname'].markAsTouched();
    this.inputForm.controls['lastname'].markAsTouched();
    this.inputForm.controls['firstnameen'].markAsTouched();
    this.inputForm.controls['lastnameen'].markAsTouched();
    this.inputForm.controls['status'].markAsTouched();
    this.inputForm.controls['prefix'].markAsTouched();
    this.inputForm.controls['idcard'].markAsTouched();
    this.inputForm.controls['email'].markAsTouched();
    this.inputForm.controls['phone'].markAsTouched();
    this.inputForm.controls['faculty'].markAsTouched();
    this.inputForm.controls['course'].markAsTouched();
    this.inputForm.controls['studentcode'].markAsTouched();
    this.inputForm.controls['address'].markAsTouched();

    this.inputForm.controls['firstname'].setErrors(null);
    this.inputForm.controls['firstnameen'].setErrors(null);
    if (this.inputForm.value.firstname == "" && this.inputForm.value.firstnameen == "") {
      this.inputForm.controls['firstname'].setErrors({ 'incorrect': true });
      this.inputForm.controls['firstnameen'].setErrors({ 'incorrect': true });
    }

    this.inputForm.controls['lastname'].setErrors(null);
    this.inputForm.controls['lastnameen'].setErrors(null);
    if (this.inputForm.value.lastname == "" && this.inputForm.value.lastnameen == "") {
      this.inputForm.controls['lastname'].setErrors({ 'incorrect': true });
      this.inputForm.controls['lastnameen'].setErrors({ 'incorrect': true });
    }

    if (this.inputForm.valid) {
      let formdata = {
        id: this.id,
        firstname: this.inputForm.value.firstname,
        lastname: this.inputForm.value.lastname,
        firstnameen: this.inputForm.value.firstnameen,
        lastnameen: this.inputForm.value.lastnameen,
        status: this.inputForm.value.status,
        prefix: this.inputForm.value.prefix,
        idcard: this.inputForm.value.idcard,
        email: this.inputForm.value.email,
        phone: this.inputForm.value.phone,
        opendate: this.inputForm.value.opendate,
        expirydate: this.inputForm.value.expirydate,
        username: this.inputForm.value.username,
        userid: this.inputForm.value.userid,
        faculty: this.inputForm.value.faculty,
        course: this.inputForm.value.course,
        studentcode: this.inputForm.value.studentcode,
        address: this.inputForm.value.address,
      };
      this.loading = true;
      if (this.id != null && parseInt(this.id) > 0) {
        this.service.httpClientPost("api/Student/update", formdata)
          .subscribe(result => {
            if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
              Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            }
            else {
              if (result["result"] == 200) {
                this.router.navigate(['/student-search/']);
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
        this.service.httpClientPost("api/Student/insert", formdata)
          .subscribe(result => {
            if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
              Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            }
            else {
              if (result["result"] == 200) {
                this.router.navigate(['/student-search/']);
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
      this.router.navigate(['/reset-password-student/', this.id]);
    }
  }
}
