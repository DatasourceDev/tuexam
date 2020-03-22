import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
declare var $: any;
declare var setup_ckeditor: any;
@Component({
  selector: 'app-mm-sub-answer',
  templateUrl: './mm-sub-answer.component.html',
  styleUrls: ['./mm-sub-answer.component.css']
})

export class MmSubAnswerComponent implements OnInit {
  public loading = false;
  private data: any;
  private choicelist: any;

  id: string;
  qid: string;
  inputForm: FormGroup;
  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute) {
    let order = new FormControl('');
    let choice = new FormControl('', Validators.required);
    let answesth = new FormControl('');
    let answesen = new FormControl('');
    let description = new FormControl('');

    this.inputForm = new FormGroup({
      order: order,
      choice: choice,
      answesth: answesth,
      answesen: answesen,
      description: description
    });
  }

  ngOnInit() {

    this.qid = this.route.snapshot.params['qid'];
    this.id = this.route.snapshot.params['id'];
    this.choicelist = this.appdata.getchoice();

    this.inputForm.patchValue({ choice: "A" });
    if (this.id != null && parseInt(this.id) > 0) {
      var formdata = { id: this.id };
      this.service.httpClientGet("api/Question/getanswer", formdata)
        .subscribe(result => {
          if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
            Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.router.navigate(['/question-multi-math/', this.qid]);
            this.loading = false;
          }
          else {
            if (result["result"] == 200) {
              setup_ckeditor();

              this.data = result;
              this.inputForm.patchValue({ order: this.data.order });
              this.inputForm.patchValue({ choice: this.data.choice });
              this.inputForm.patchValue({ answesth: this.data.answesth });
              this.inputForm.patchValue({ answesen: this.data.answesen });
              this.inputForm.patchValue({ description: this.data.description });

              $('#answesth').val(this.data.answesth);
              $('#answesen').val(this.data.answesen);
            }
            else {
              Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
              this.router.navigate(['/question-multi-math/', this.qid]);
            }
            this.loading = false;
          }
        }, error => {
          Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        });
    }
    else {
      setup_ckeditor();

      var formdata = { id: this.qid };
      this.service.httpClientGet("api/Question/getanswernext", formdata)
        .subscribe(result => {
          if (result == null || (Array.isArray(result) && result.length == 0)) {
            Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.router.navigate(['/question-multi-math/', this.qid]);
          }
          else {
            this.inputForm.patchValue({ order: result });
          }
        }, error => {
          Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        });
    }
  }
  OnSubmit() {
    this.inputForm.controls['choice'].markAsTouched();
    this.inputForm.controls['answesth'].markAsTouched();
    this.inputForm.controls['answesen'].markAsTouched();
    this.inputForm.controls['description'].markAsTouched();

    var answesth = $('#answesth').val();
    var answesen = $('#answesen').val();
    this.inputForm.patchValue({ answesth: answesth });
    this.inputForm.patchValue({ answesen: answesen });

    this.inputForm.controls['answesth'].setErrors(null);
    this.inputForm.controls['answesen'].setErrors(null);
    if (this.inputForm.value.answesth == "" && this.inputForm.value.answesen == "") {
      this.inputForm.controls['answesth'].setErrors({ 'incorrect': true });
      this.inputForm.controls['answesen'].setErrors({ 'incorrect': true });
    }
    if (this.inputForm.valid) {
      let formdata = {
        ID: this.id,
        QuestionID: this.qid,
        Order: this.inputForm.value.order,
        Choice: this.inputForm.value.choice,
        AnswerTh: this.inputForm.value.answesth,
        AnswerEn: this.inputForm.value.answesen,
        Description: this.inputForm.value.description,
      };
      this.loading = true;
      if (this.id != null && parseInt(this.id) > 0) {
        this.service.httpClientPost("api/Question/answerupdate", formdata)
          .subscribe(result => {
            if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
              Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            }
            else {
              if (result["result"] == 200) {
                this.router.navigate(['/question-multi-math/', this.qid]);
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
        this.service.httpClientPost("api/Question/answerinsert", formdata)
          .subscribe(result => {
            if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
              Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            }
            else {
              if (result["result"] == 200) {
                this.router.navigate(['/question-multi-math/', this.qid]);
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
    this.router.navigate(['/question-multi-math/', this.qid]);
    return false;
  }

 
}

