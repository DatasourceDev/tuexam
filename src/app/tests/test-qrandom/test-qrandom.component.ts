import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-test-qrandom',
  templateUrl: './test-qrandom.component.html',
  styleUrls: ['./test-qrandom.component.css']
})
export class TestQrandomComponent implements OnInit {
  public loading = false;
  private data: any;
  id: string;
  tid: string;
 gid: string;
  sid: string;
  private questiontypelist: any;
  private sublist: any;

  inputForm: FormGroup;
  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute) {
    let questiontype = new FormControl('', Validators.required);
    let subid = new FormControl('');
    let veryeasy = new FormControl('');
    let easy = new FormControl('');
    let mid = new FormControl('');
    let hard= new FormControl('');
    let veryhard= new FormControl('');

    this.inputForm = new FormGroup({
      questiontype: questiontype,
      subid: subid,
      veryeasy: veryeasy,
      easy: easy,
      mid: mid,
      hard: hard,
      veryhard: veryhard,
    });
  }

  ngOnInit() {
    this.questiontypelist = this.appdata.getquestiontype();

    this.tid = this.route.snapshot.params['tid'];
    this.gid = this.route.snapshot.params['gid'];
    this.sid = this.route.snapshot.params['sid'];
    this.id = this.route.snapshot.params['id'];
    this.OnSubList();
    this.inputForm.patchValue({ questiontype: "1" });

    if (this.id != null && parseInt(this.id) > 0) {
      var formdata = { id: this.id };
      this.service.httpClientGet("api/Test/getqrandom", formdata)
        .subscribe(result => {
          if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
            Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.router.navigate(['/test/', this.tid]);
            this.loading = false;
          }
          else {
            if (result["result"] == 200) {
              this.data = result;
              this.inputForm.patchValue({ questiontype: this.data.questiontype });
              this.inputForm.patchValue({ subid: this.data.subid });
              this.inputForm.patchValue({ veryeasy: this.data.veryeasy });
              this.inputForm.patchValue({ easy: this.data.easy });
              this.inputForm.patchValue({ mid: this.data.mid });
              this.inputForm.patchValue({ hard: this.data.hard });
              this.inputForm.patchValue({ veryhard: this.data.veryhard });
            }
            else {
              Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
              this.router.navigate(['/test/', this.tid]);
            }
            this.loading = false;
          }
        }, error => {
            Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        });
    }
  }
  OnSubList() {
    let formdata = {
      subject_search: this.sid
    };
    this.service.httpClientGet("api/SubjectSub/listActivesub", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.sublist = null;
        }
        else {
          this.sublist = result;
          if (this.sublist != null && this.sublist.length > 0) {
            var sub = this.sublist[0];
            this.inputForm.patchValue({ subid: sub.id });
          }
        }
      }, error => {
          Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });

      });
  }
  OnSubmit() {
    this.inputForm.controls['questiontype'].markAsTouched();
    this.inputForm.controls['subid'].markAsTouched();
    this.inputForm.controls['veryeasy'].markAsTouched();
    this.inputForm.controls['easy'].markAsTouched();
    this.inputForm.controls['mid'].markAsTouched();
    this.inputForm.controls['hard'].markAsTouched();
    this.inputForm.controls['veryhard'].markAsTouched();

    this.inputForm.controls['veryeasy'].setErrors(null);
    this.inputForm.controls['easy'].setErrors(null);
    this.inputForm.controls['mid'].setErrors(null);
    this.inputForm.controls['hard'].setErrors(null);
    this.inputForm.controls['veryhard'].setErrors(null);
    if (this.inputForm.value.veryeasy == "" && this.inputForm.value.easy == "" && this.inputForm.value.mid == "" && this.inputForm.value.hard == "" && this.inputForm.value.veryhard == "") {
      this.inputForm.controls['veryeasy'].setErrors({ 'incorrect': true });
      this.inputForm.controls['easy'].setErrors({ 'incorrect': true });
      this.inputForm.controls['mid'].setErrors({ 'incorrect': true });
      this.inputForm.controls['hard'].setErrors({ 'incorrect': true });
      this.inputForm.controls['veryhard'].setErrors({ 'incorrect': true });
    }

    if (this.inputForm.valid) {
      let formdata = {
        ID: this.id,
        TestID: this.tid,
        QuestionType: this.inputForm.value.questiontype,
        SubjectSubID: this.inputForm.value.subid,
        VeryEasy: this.inputForm.value.veryeasy,
        Easy: this.inputForm.value.easy,
        Mid: this.inputForm.value.mid,
        Hard: this.inputForm.value.hard,
        VeryHard: this.inputForm.value.veryhard,
      };
      this.loading = true;
      if (this.id != null && parseInt(this.id) > 0) {
        this.service.httpClientPost("api/Test/qrandomupdate", formdata)
          .subscribe(result => {
            if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
              Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            }
            else {
              if (result["result"] == 200) {
                this.router.navigate(['/test/', this.tid]);
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
        this.service.httpClientPost("api/Test/qrandominsert", formdata)
          .subscribe(result => {
            if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
              Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            }
            else {
              if (result["result"] == 200) {
                this.router.navigate(['/test/', this.tid]);
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

  OnBack() {
    this.router.navigate(['/test/', this.tid]);
    return false;
  }

}
