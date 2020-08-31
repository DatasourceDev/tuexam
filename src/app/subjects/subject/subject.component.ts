import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  public loading = false;
  private data: any;
  private statuslist: any;
  private grouplist: any;

  id: string;
  groupname: string;
  inputForm: FormGroup;
  statusname: string;

  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute) {
    let name = new FormControl('', [Validators.required, Validators.maxLength(250)]);
    let status = new FormControl('', Validators.required);
    let groupid = new FormControl('', Validators.required);
    let order = new FormControl('', Validators.required);
    let description = new FormControl('');

    this.inputForm = new FormGroup({
      name: name,
      status: status,
      groupid: groupid,
      order: order,
      description: description,
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.statuslist = this.appdata.getstatus();
    this.inputForm.patchValue({ status: "1" });

    this.service.httpClientGet("api/SubjectGroup/listActivegroup", { nogreats: true })
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.grouplist = null;
        }
        else {
          this.grouplist = result;
          if (this.inputForm.value.groupid == null || this.inputForm.value.groupid == '') {
            if (this.grouplist != null && this.grouplist.length > 0) {
              var group = this.grouplist[0];
              this.inputForm.patchValue({ groupid: group.id });
              if (this.id == null || parseInt(this.id) == 0) {
                this.OnNextOrder();
              }
            }
          }
        }
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
      });

    if (this.id != null && parseInt(this.id) > 0) {
      this.loading = true;
      var formdata = { id: this.id };
      this.service.httpClientGet("api/Subject/getsubject", formdata)
        .subscribe(result => {
          if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
            Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.router.navigate(['/subject-search/']);
            this.loading = false;
          }
          else {
            if (result["result"] == 200) {
              this.data = result;
              this.inputForm.patchValue({ name: this.data.name });
              this.inputForm.patchValue({ description: this.data.description });
              this.inputForm.patchValue({ status: this.data.status });
              this.inputForm.patchValue({ groupid: this.data.groupid });
              this.inputForm.patchValue({ order: this.data.order });
              this.groupname = this.data.group;
              this.statusname = this.data.statusname;
            }
            else {
              Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
              this.router.navigate(['/subject-search/']);
            }
            this.loading = false;
          }
        }, error => {
          Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          this.loading = false;
        });
    }
  }
  OnGroupChange() {
    this.OnNextOrder();
  }
  OnNextOrder() {
    let formdata = { id: this.inputForm.value.groupid };
    this.service.httpClientGet("api/Subject/getordernext", formdata)
      .subscribe(result => {
        if (result == null || (Array.isArray(result) && result.length == 0)) {
          Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        }
        else {
          this.inputForm.patchValue({ order: result });
        }
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
      });
  }
  OnSubmit() {
    this.inputForm.controls['name'].markAsTouched();
    this.inputForm.controls['description'].markAsTouched();
    this.inputForm.controls['status'].markAsTouched();
    this.inputForm.controls['groupid'].markAsTouched();
    this.inputForm.controls['order'].markAsTouched();

    if (this.inputForm.valid) {
      let formdata = {
        ID: this.id,
        Name: this.inputForm.value.name,
        Description: this.inputForm.value.description,
        Status: this.inputForm.value.status,
        SubjectGroupID: this.inputForm.value.groupid,
        Order: this.inputForm.value.order,
      };
      this.loading = true;
      if (this.id != null && parseInt(this.id) > 0) {
        this.service.httpClientPost("api/Subject/update", formdata)
          .subscribe(result => {
            if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
              Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            }
            else {
              if (result["result"] == 200) {
                this.router.navigate(['/subject-search/']);
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
        this.service.httpClientPost("api/Subject/insert", formdata)
          .subscribe(result => {
            if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
              Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            }
            else {
              if (result["result"] == 200) {
                this.router.navigate(['/subject-search/']);
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
