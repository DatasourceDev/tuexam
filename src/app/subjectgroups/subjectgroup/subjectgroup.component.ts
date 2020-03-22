import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-subjectgroup',
  templateUrl: './subjectgroup.component.html',
  styleUrls: ['./subjectgroup.component.css']
})
export class SubjectgroupComponent implements OnInit {
  public loading = false;
  private data: any;
  private statuslist: any;
  id: string;

  inputForm: FormGroup;

  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute) {
    let name = new FormControl('', [Validators.required, Validators.maxLength(250)]);
    let status = new FormControl('', Validators.required);
    let color1 = new FormControl('');
    let color2 = new FormControl('');
    let color3 = new FormControl('');
    let doexamorder = new FormControl('');

    this.inputForm = new FormGroup({
      name: name,
      status: status,
      color1: color1,
      color2: color2,
      color3: color3,
      doexamorder: doexamorder,
    });
  }

  ngOnInit() {
    this.statuslist = this.appdata.getstatus();
    this.id = this.route.snapshot.params['id'];
    this.inputForm.patchValue({ status: "1" });

    if (this.id != null && parseInt(this.id) > 0) {
      this.loading = true;
      var formdata = { id: this.id };
      this.service.httpClientGet("api/SubjectGroup/getgroup", formdata)
        .subscribe(result => {
          if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
            Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.router.navigate(['/subjectgroup-search/']);
            this.loading = false;
          }
          else {
            if (result["result"] == 200) {
              this.data = result;
              this.inputForm.patchValue({ name: this.data.name });
              this.inputForm.patchValue({ status: this.data.status });
              this.inputForm.patchValue({ color1: this.data.color1 });
              this.inputForm.patchValue({ color2: this.data.color2 });
              this.inputForm.patchValue({ color3: this.data.color3 });
              this.inputForm.patchValue({ doexamorder: this.data.doexamorder });
            }
            else {
              Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
              this.router.navigate(['/subjectgroup-search/']);
            }
            this.loading = false;
          }
        }, error => {
            Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          this.loading = false;
        });
    }
  }
  OnSubmit() {
    this.inputForm.controls['name'].markAsTouched();
    this.inputForm.controls['status'].markAsTouched();
    this.inputForm.controls['color1'].markAsTouched();
    this.inputForm.controls['color2'].markAsTouched();
    this.inputForm.controls['color3'].markAsTouched();
    this.inputForm.controls['doexamorder'].markAsTouched();

    if (this.inputForm.value.doexamorder == null || this.inputForm.value.doexamorder == '') {
      this.inputForm.patchValue({ doexamorder: false });
    }
    if (this.inputForm.valid) {
      let formdata = {
        ID: this.id,
        Name: this.inputForm.value.name,
        Status: this.inputForm.value.status,
        Color1: this.inputForm.value.color1,
        Color2: this.inputForm.value.color2,
        Color3: this.inputForm.value.color3,
        DoExamOrder: this.inputForm.value.doexamorder,
      };
      this.loading = true;
      if (this.id != null && parseInt(this.id) > 0) {
        this.service.httpClientPost("api/SubjectGroup/update", formdata)
          .subscribe(result => {
            if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
              Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            }
            else {
              if (result["result"] == 200) {
                this.router.navigate(['/subjectgroup-search/']);
              }
              else {
                Swal.fire({ text: result["message"], type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
              }
            }
            this.loading = false;
          }, error => {
              Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.loading = false;
          });
      }
      else {
        this.service.httpClientPost("api/SubjectGroup/insert", formdata)
          .subscribe(result => {
            if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
              Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            }
            else {
              if (result["result"] == 200) {
                this.router.navigate(['/subjectgroup-search/']);
              }
              else {
                Swal.fire({ text: result["message"], type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
              };
            }
            this.loading = false;
          }, error => {
              Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.loading = false;
          });
      }
    }
  }
}
