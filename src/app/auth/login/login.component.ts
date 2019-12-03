import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from "@angular/forms";
import { concat } from 'rxjs';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import Swal from 'sweetalert2';            
import { SessionService } from 'src/app/share/service/session.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loading = false;
  inputForm: FormGroup;
  public useraccesdata: any;

  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute, private session: SessionService) {
    let username = new FormControl('', [Validators.required, Validators.maxLength(250)]);
    let password = new FormControl('', [Validators.required, Validators.maxLength(250)]);

    this.inputForm = new FormGroup({
      username: username,
      password: password,
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.inputForm.controls['username'].markAsTouched();
    this.inputForm.controls['password'].markAsTouched();
    if (this.inputForm.valid) {
      this.loading = true;

      let formdata = {
        username: this.inputForm.value.username,
        password: this.inputForm.value.password
      };
      this.service.httpClientGet("api/Account/login", formdata)
        .subscribe(result => {
          if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
            Swal.fire({
              text: 'รหัสผู้ใช้หรือรหัสผ่านผิดพลาด',
              type: 'warning',
              confirmButtonText: 'ตกลง',
              buttonsStyling: false,
              customClass: {
                confirmButton: 'btn btn-danger'
              }
            });
            this.loading = false;

          }
          else {
            if (result["result"] == 200) {
              this.session.logIn(result["token"], JSON.stringify(result['user']));
              let useracces = this.session.getData();
              this.useraccesdata = JSON.parse(useracces);
              this.router.navigate(["/dashboard"]);
            }
            else {
              Swal.fire({
                text: 'รหัสผู้ใช้หรือรหัสผ่านผิดพลาด',
                type: 'warning',
                confirmButtonText: 'ตกลง',
                buttonsStyling: false,
                customClass: {
                  confirmButton: 'btn btn-danger'
                }
              });
            }
            this.loading = false;

          }
        }, error => {
            Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.loading = false;
        });
    }
  }

  ForgotPwd() {
    this.router.navigate(["/forgot"]);
    return false;
  }
}
