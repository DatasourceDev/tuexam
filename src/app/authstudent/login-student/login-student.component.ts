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
import { TranslationService } from 'src/app/share/service/translation.service';

@Component({
  selector: 'app-login-student',
  templateUrl: './login-student.component.html',
  styleUrls: ['./login-student.component.css']
})
export class LoginStudentComponent implements OnInit {
  public loading = false;
  inputForm: FormGroup;
  public useraccesdata: any;
  constructor(private translator: TranslationService,private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute, private session: SessionService) {
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
      this.service.httpClientGet("api/Account/loginstudent", formdata)
        .subscribe(result => {
          if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
            Swal.fire({
              text: 'รหัสผู้ใช้หรือรหัสผ่านผิดพลาด',
              type: 'warning',
              confirmButtonText: 'ตกลง',
              buttonsStyling: false,
              customClass: {
                confirmButton: 'btn btn-orange'
              }
            });
            this.loading = false;

          }
          else {
            if (result["result"] == 200) {
              this.session.logIn(result["token"], JSON.stringify(result['user']));
              let useracces = this.session.getData();
              this.useraccesdata = JSON.parse(useracces);
              this.router.navigate(["/examination-select"]);
              
            }
            else {
              Swal.fire({
                text: 'รหัสผู้ใช้หรือรหัสผ่านผิดพลาด',
                type: 'warning',
                confirmButtonText: 'ตกลง',
                buttonsStyling: false,
                customClass: {
                  confirmButton: 'btn btn-orange'
                }
              });
            }
            this.loading = false;

          }
        }, error => {
            Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-orange' } });
          this.loading = false;
        });
    }
  }

  translate(key: string): string {
    return this.translator.translate(key);
  }

  OnEn() {
    this.translator.setLanguage('en');
    return false;
  }
  OnTh() {
    this.translator.setLanguage('th');
    return false;
  }
}
