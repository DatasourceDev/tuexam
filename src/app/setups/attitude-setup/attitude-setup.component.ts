import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-attitude-setup',
  templateUrl: './attitude-setup.component.html',
  styleUrls: ['./attitude-setup.component.css']
})
export class AttitudeSetupComponent implements OnInit {

  public loading = false;
  private data: any;

  inputForm: FormGroup;
  private attitudeanstypelist: any;
  private attitudeanssubtypelist: any;

  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute) {
    let attitudeanstype = new FormControl('', Validators.required);
    let attitudeanssubtype = new FormControl('', Validators.required);
    let text1 = new FormControl('', Validators.maxLength(250));
    let text2 = new FormControl('', Validators.maxLength(250));
    let text3 = new FormControl('', Validators.maxLength(250));
    let text4 = new FormControl('', Validators.maxLength(250));
    let text5 = new FormControl('', Validators.maxLength(250));
    let text6 = new FormControl('', Validators.maxLength(250));
    let text7 = new FormControl('', Validators.maxLength(250));

    let texten1 = new FormControl('', Validators.maxLength(250));
    let texten2 = new FormControl('', Validators.maxLength(250));
    let texten3 = new FormControl('', Validators.maxLength(250));
    let texten4 = new FormControl('', Validators.maxLength(250));
    let texten5 = new FormControl('', Validators.maxLength(250));
    let texten6 = new FormControl('', Validators.maxLength(250));
    let texten7 = new FormControl('', Validators.maxLength(250));
    let point1 = new FormControl('');
    let point2 = new FormControl('');
    let point3 = new FormControl('');
    let point4 = new FormControl('');
    let point5 = new FormControl('');
    let point6 = new FormControl('');
    let point7 = new FormControl('');

    this.inputForm = new FormGroup({
      attitudeanstype: attitudeanstype,
      attitudeanssubtype: attitudeanssubtype,
      text1: text1,
      text2: text2,
      text3: text3,
      text4: text4,
      text5: text5,
      text6: text6,
      text7: text7,
      texten1: texten1,
      texten2: texten2,
      texten3: texten3,
      texten4: texten4,
      texten5: texten5,
      texten6: texten6,
      texten7: texten7,
      point1: point1,
      point2: point2,
      point3: point3,
      point4: point4,
      point5: point5,
      point6: point6,
      point7: point7,
    });
  }

  ngOnInit() {
    this.attitudeanstypelist = this.appdata.getattitudeanstype();
    this.attitudeanssubtypelist = this.appdata.getattitudeanssubtype();
    this.inputForm.patchValue({ attitudeanstype: "2" });
    this.inputForm.patchValue({ attitudeanssubtype: "1" });
    this.OnSearch();
    this.OnTypeChange();
  }
  OnTypeChange() {
    if (this.inputForm.value.attitudeanstype == "2") {
      $('#div1').show();
      $('#div2').show();
      $('#div3').hide();
      $('#div4').hide();
      $('#div5').hide();
      $('#div6').hide();
      $('#div7').hide();
    }
    if (this.inputForm.value.attitudeanstype == "3") {
      $('#div1').show();
      $('#div2').show();
      $('#div3').show();
      $('#div4').hide();
      $('#div5').hide();
      $('#div6').hide();
      $('#div7').hide();
    }
    else if (this.inputForm.value.attitudeanstype == "4") {
      $('#div1').show();
      $('#div2').show();
      $('#div3').show();
      $('#div4').show();
      $('#div5').hide();
      $('#div6').hide();
      $('#div7').hide();
    }
    else if (this.inputForm.value.attitudeanstype == "5") {
      $('#div1').show();
      $('#div2').show();
      $('#div3').show();
      $('#div4').show();
      $('#div5').show();
      $('#div6').hide();
      $('#div7').hide();
    }
    else if (this.inputForm.value.attitudeanstype == "6") {
      $('#div1').show();
      $('#div2').show();
      $('#div3').show();
      $('#div4').show();
      $('#div5').show();
      $('#div6').show();
      $('#div7').hide();
    }
    else if (this.inputForm.value.attitudeanstype == "7") {
      $('#div1').show();
      $('#div2').show();
      $('#div3').show();
      $('#div4').show();
      $('#div5').show();
      $('#div6').show();
      $('#div7').show();
    }
    this.OnSearch();
  }
  OnSearch() {
    this.loading = true;
    let formdata = {
      type_search: this.inputForm.value.attitudeanstype,
      subtype_search: this.inputForm.value.attitudeanssubtype
    };
    this.service.httpClientGet("api/AttitudeSetup/getattitudesetup", formdata)
      .subscribe(result => {
        if (result["result"] == 200) {
          if (result != null) {
            this.data = result;
            this.inputForm.patchValue({ text1: this.data.text1 });
            this.inputForm.patchValue({ text2: this.data.text2 });
            this.inputForm.patchValue({ text3: this.data.text3 });
            this.inputForm.patchValue({ text4: this.data.text4 });
            this.inputForm.patchValue({ text5: this.data.text5 });
            this.inputForm.patchValue({ text6: this.data.text6 });
            this.inputForm.patchValue({ text7: this.data.text7 });

            this.inputForm.patchValue({ texten1: this.data.texten1 });
            this.inputForm.patchValue({ texten2: this.data.texten2 });
            this.inputForm.patchValue({ texten3: this.data.texten3 });
            this.inputForm.patchValue({ texten4: this.data.texten4 });
            this.inputForm.patchValue({ texten5: this.data.texten5 });
            this.inputForm.patchValue({ texten6: this.data.texten6 });
            this.inputForm.patchValue({ texten7: this.data.texten7 });

            this.inputForm.patchValue({ point1: this.data.point1 });
            this.inputForm.patchValue({ point2: this.data.point2 });
            this.inputForm.patchValue({ point3: this.data.point3 });
            this.inputForm.patchValue({ point4: this.data.point4 });
            this.inputForm.patchValue({ point5: this.data.point5 });
            this.inputForm.patchValue({ point6: this.data.point6 });
            this.inputForm.patchValue({ point7: this.data.point7 });
          }
        }
        else {
          this.inputForm.patchValue({ text1: '' });
          this.inputForm.patchValue({ text2: '' });
          this.inputForm.patchValue({ text3: '' });
          this.inputForm.patchValue({ text4: '' });
          this.inputForm.patchValue({ text5: '' });
          this.inputForm.patchValue({ text6: '' });
          this.inputForm.patchValue({ text7: '' });
          this.inputForm.patchValue({ texten1: '' });
          this.inputForm.patchValue({ texten2: '' });
          this.inputForm.patchValue({ texten3: '' });
          this.inputForm.patchValue({ texten4: '' });
          this.inputForm.patchValue({ texten5: '' });
          this.inputForm.patchValue({ texten6: '' });
          this.inputForm.patchValue({ texten7: '' });
          this.inputForm.patchValue({ point1: '' });
          this.inputForm.patchValue({ point2: '' });
          this.inputForm.patchValue({ point3: '' });
          this.inputForm.patchValue({ point4: '' });
          this.inputForm.patchValue({ point5: '' });
          this.inputForm.patchValue({ point6: '' });
          this.inputForm.patchValue({ point7: '' });
        }
        this.loading = false;

      }, error => {
          Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
  }
  OnSubmit() {
    this.inputForm.controls['attitudeanstype'].markAsTouched();
    this.inputForm.controls['attitudeanssubtype'].markAsTouched();
    this.inputForm.controls['text1'].markAsTouched();
    this.inputForm.controls['text2'].markAsTouched();
    this.inputForm.controls['text3'].markAsTouched();
    this.inputForm.controls['text4'].markAsTouched();
    this.inputForm.controls['text5'].markAsTouched();
    this.inputForm.controls['text6'].markAsTouched();
    this.inputForm.controls['text7'].markAsTouched();

    this.inputForm.controls['texten1'].markAsTouched();
    this.inputForm.controls['texten2'].markAsTouched();
    this.inputForm.controls['texten3'].markAsTouched();
    this.inputForm.controls['texten4'].markAsTouched();
    this.inputForm.controls['texten5'].markAsTouched();
    this.inputForm.controls['texten6'].markAsTouched();
    this.inputForm.controls['texten7'].markAsTouched();

    this.inputForm.controls['text1'].setErrors(null); 
    this.inputForm.controls['text2'].setErrors(null); 
    this.inputForm.controls['text3'].setErrors(null); 
    this.inputForm.controls['text4'].setErrors(null); 
    this.inputForm.controls['text5'].setErrors(null); 
    this.inputForm.controls['text6'].setErrors(null); 
    this.inputForm.controls['text7'].setErrors(null);

    this.inputForm.controls['texten1'].setErrors(null);
    this.inputForm.controls['texten2'].setErrors(null);
    this.inputForm.controls['texten3'].setErrors(null);
    this.inputForm.controls['texten4'].setErrors(null);
    this.inputForm.controls['texten5'].setErrors(null);
    this.inputForm.controls['texten6'].setErrors(null);
    this.inputForm.controls['texten7'].setErrors(null);

    this.inputForm.controls['point1'].setErrors(null);
    this.inputForm.controls['point2'].setErrors(null);
    this.inputForm.controls['point3'].setErrors(null);
    this.inputForm.controls['point4'].setErrors(null);
    this.inputForm.controls['point5'].setErrors(null);
    this.inputForm.controls['point6'].setErrors(null);
    this.inputForm.controls['point7'].setErrors(null);

    if (this.inputForm.value.attitudeanstype == "2") {
      if (this.inputForm.value.text1 == null || this.inputForm.value.text1 === "") {
        this.inputForm.controls['text1'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.text2 == null || this.inputForm.value.text2 === "") {
        this.inputForm.controls['text2'].setErrors({ 'incorrect': true });
      }
      
      if (this.inputForm.value.texten1 == null || this.inputForm.value.texten1 === "") {
        this.inputForm.controls['texten1'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.texten2 == null || this.inputForm.value.texten2 === "") {
        this.inputForm.controls['texten2'].setErrors({ 'incorrect': true });
      }

      if (this.inputForm.value.point1 == null || this.inputForm.value.point1 === "") {
        this.inputForm.controls['point1'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point2 == null || this.inputForm.value.point2 === "") {
        this.inputForm.controls['point2'].setErrors({ 'incorrect': true });
      }
     
    }
    else if (this.inputForm.value.attitudeanstype == "3") {
      if (this.inputForm.value.text1 == null || this.inputForm.value.text1 === "") {
        this.inputForm.controls['text1'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.text2 == null || this.inputForm.value.text2 === "") {
        this.inputForm.controls['text2'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.text3 == null || this.inputForm.value.text3 === "") {
        this.inputForm.controls['text3'].setErrors({ 'incorrect': true });
      }

      if (this.inputForm.value.texten1 == null || this.inputForm.value.texten1 === "") {
        this.inputForm.controls['texten1'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.texten2 == null || this.inputForm.value.texten2 === "") {
        this.inputForm.controls['texten2'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.texten3 == null || this.inputForm.value.texten3 === "") {
        this.inputForm.controls['texten3'].setErrors({ 'incorrect': true });
      }

      if (this.inputForm.value.point1 == null || this.inputForm.value.point1 === "") {
        this.inputForm.controls['point1'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point2 == null || this.inputForm.value.point2 === "") {
        this.inputForm.controls['point2'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point3 == null || this.inputForm.value.point3 === "") {
        this.inputForm.controls['point3'].setErrors({ 'incorrect': true });
      }
    }
    else if (this.inputForm.value.attitudeanstype == "4") {
      if (this.inputForm.value.text1 == null || this.inputForm.value.text1 === "") {
        this.inputForm.controls['text1'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.text2 == null || this.inputForm.value.text2 === "") {
        this.inputForm.controls['text2'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.text3 == null || this.inputForm.value.text3 === "") {
        this.inputForm.controls['text3'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.text4 == null || this.inputForm.value.text4 === "") {
        this.inputForm.controls['text4'].setErrors({ 'incorrect': true });
      }

      if (this.inputForm.value.texten1 == null || this.inputForm.value.texten1 === "") {
        this.inputForm.controls['texten1'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.texten2 == null || this.inputForm.value.texten2 === "") {
        this.inputForm.controls['texten2'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.texten3 == null || this.inputForm.value.texten3 === "") {
        this.inputForm.controls['texten3'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.texten4 == null || this.inputForm.value.texten4 === "") {
        this.inputForm.controls['texten4'].setErrors({ 'incorrect': true });
      }

      if (this.inputForm.value.point1 == null || this.inputForm.value.point1 === "") {
        this.inputForm.controls['point1'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point2 == null || this.inputForm.value.point2 === "") {
        this.inputForm.controls['point2'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point3 == null || this.inputForm.value.point3 === "") {
        this.inputForm.controls['point3'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point4 == null || this.inputForm.value.point4 === "") {
        this.inputForm.controls['point4'].setErrors({ 'incorrect': true });
      }
    }
    else if (this.inputForm.value.attitudeanstype == "5") {
      if (this.inputForm.value.text1 == null || this.inputForm.value.text1 === "") {
        this.inputForm.controls['text1'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.text2 == null || this.inputForm.value.text2 === "") {
        this.inputForm.controls['text2'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.text3 == null || this.inputForm.value.text3 === "") {
        this.inputForm.controls['text3'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.text4 == null || this.inputForm.value.text4 === "") {
        this.inputForm.controls['text4'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.text5 == null || this.inputForm.value.text5 === "") {
        this.inputForm.controls['text5'].setErrors({ 'incorrect': true });
      }

      if (this.inputForm.value.texten1 == null || this.inputForm.value.texten1 === "") {
        this.inputForm.controls['texten1'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.texten2 == null || this.inputForm.value.texten2 === "") {
        this.inputForm.controls['texten2'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.texten3 == null || this.inputForm.value.texten3 === "") {
        this.inputForm.controls['texten3'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.texten4 == null || this.inputForm.value.texten4 === "") {
        this.inputForm.controls['texten4'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.texten5 == null || this.inputForm.value.texten5 === "") {
        this.inputForm.controls['texten5'].setErrors({ 'incorrect': true });
      }

      if (this.inputForm.value.point1 == null || this.inputForm.value.point1 === "") {
        this.inputForm.controls['point1'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point2 == null || this.inputForm.value.point2 === "") {
        this.inputForm.controls['point2'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point3 == null || this.inputForm.value.point3 === "") {
        this.inputForm.controls['point3'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point4 == null || this.inputForm.value.point4 === "") {
        this.inputForm.controls['point4'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point5 == null || this.inputForm.value.point5 === "") {
        this.inputForm.controls['point5'].setErrors({ 'incorrect': true });
      }
    }
    else if (this.inputForm.value.attitudeanstype == "6") {
      if (this.inputForm.value.text1 == null || this.inputForm.value.text1 === "") {
        this.inputForm.controls['text1'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.text2 == null || this.inputForm.value.text2 === "") {
        this.inputForm.controls['text2'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.text3 == null || this.inputForm.value.text3 === "") {
        this.inputForm.controls['text3'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.text4 == null || this.inputForm.value.text4 === "") {
        this.inputForm.controls['text4'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.text5 == null || this.inputForm.value.text5 === "") {
        this.inputForm.controls['text5'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.text6 == null || this.inputForm.value.text6 === "") {
        this.inputForm.controls['text6'].setErrors({ 'incorrect': true });
      }

      if (this.inputForm.value.texten1 == null || this.inputForm.value.texten1 === "") {
        this.inputForm.controls['texten1'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.texten2 == null || this.inputForm.value.texten2 === "") {
        this.inputForm.controls['texten2'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.texten3 == null || this.inputForm.value.texten3 === "") {
        this.inputForm.controls['texten3'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.texten4 == null || this.inputForm.value.texten4 === "") {
        this.inputForm.controls['texten4'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.texten5 == null || this.inputForm.value.texten5 === "") {
        this.inputForm.controls['texten5'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.texten6 == null || this.inputForm.value.texten6 === "") {
        this.inputForm.controls['texten6'].setErrors({ 'incorrect': true });
      }

      if (this.inputForm.value.point1 == null || this.inputForm.value.point1 === "") {
        this.inputForm.controls['point1'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point2 == null || this.inputForm.value.point2 === "") {
        this.inputForm.controls['point2'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point3 == null || this.inputForm.value.point3 === "") {
        this.inputForm.controls['point3'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point4 == null || this.inputForm.value.point4 === "") {
        this.inputForm.controls['point4'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point5 == null || this.inputForm.value.point5 === "") {
        this.inputForm.controls['point5'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point6 == null || this.inputForm.value.point6 === "") {
        this.inputForm.controls['point6'].setErrors({ 'incorrect': true });
      }
    }
    else if (this.inputForm.value.attitudeanstype == "7") {
      if (this.inputForm.value.text1 == null || this.inputForm.value.text1 === "") {
        this.inputForm.controls['text1'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.text2 == null || this.inputForm.value.text2 === "") {
        this.inputForm.controls['text2'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.text3 == null || this.inputForm.value.text3 === "") {
        this.inputForm.controls['text3'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.text4 == null || this.inputForm.value.text4 === "") {
        this.inputForm.controls['text4'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.text5 == null || this.inputForm.value.text5 === "") {
        this.inputForm.controls['text5'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.text6 == null || this.inputForm.value.text6 === "") {
        this.inputForm.controls['text6'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.text7 == null || this.inputForm.value.text7 === "") {
        this.inputForm.controls['text7'].setErrors({ 'incorrect': true });
      }

      if (this.inputForm.value.texten1 == null || this.inputForm.value.texten1 === "") {
        this.inputForm.controls['texten1'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.texten2 == null || this.inputForm.value.texten2 === "") {
        this.inputForm.controls['texten2'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.texten3 == null || this.inputForm.value.texten3 === "") {
        this.inputForm.controls['texten3'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.texten4 == null || this.inputForm.value.texten4 === "") {
        this.inputForm.controls['texten4'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.texten5 == null || this.inputForm.value.texten5 === "") {
        this.inputForm.controls['texten5'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.texten6 == null || this.inputForm.value.texten6 === "") {
        this.inputForm.controls['texten6'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.texten7 == null || this.inputForm.value.texten7 === "") {
        this.inputForm.controls['texten7'].setErrors({ 'incorrect': true });
      }

      if (this.inputForm.value.point1 == null || this.inputForm.value.point1 === "") {
        this.inputForm.controls['point1'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point2 == null || this.inputForm.value.point2 === "") {
        this.inputForm.controls['point2'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point3 == null || this.inputForm.value.point3 === "") {
        this.inputForm.controls['point3'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point4 == null || this.inputForm.value.point4 === "") {
        this.inputForm.controls['point4'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point5 == null || this.inputForm.value.point5 === "") {
        this.inputForm.controls['point5'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point6 == null || this.inputForm.value.point6 === "") {
        this.inputForm.controls['point6'].setErrors({ 'incorrect': true });
      }
      if (this.inputForm.value.point7 == null || this.inputForm.value.point7 === "") {
        this.inputForm.controls['point7'].setErrors({ 'incorrect': true });
      }
    }
    if (this.inputForm.valid) {
      let formdata = {
        AttitudeAnsType: this.inputForm.value.attitudeanstype,
        AttitudeAnsSubType: this.inputForm.value.attitudeanssubtype,
        Text1: this.inputForm.value.text1,
        Text2: this.inputForm.value.text2,
        Text3: this.inputForm.value.text3,
        Text4: this.inputForm.value.text4,
        Text5: this.inputForm.value.text5,
        Text6: this.inputForm.value.text6,
        Text7: this.inputForm.value.text7,
        TextEn1: this.inputForm.value.texten1,
        TextEn2: this.inputForm.value.texten2,
        TextEn3: this.inputForm.value.texten3,
        TextEn4: this.inputForm.value.texten4,
        TextEn5: this.inputForm.value.texten5,
        TextEn6: this.inputForm.value.texten6,
        TextEn7: this.inputForm.value.texten7,
        Point1: this.inputForm.value.point1,
        Point2: this.inputForm.value.point2,
        Point3: this.inputForm.value.point3,
        Point4: this.inputForm.value.point4,
        Point5: this.inputForm.value.point5,
        Point6: this.inputForm.value.point6,
        Point7: this.inputForm.value.point7,
      };
      this.loading = true;
      this.service.httpClientPost("api/AttitudeSetup/modify", formdata)
        .subscribe(result => {
          if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
            Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          }
          else {
            if (result["result"] == 200) {
              Swal.fire({ text: 'บันทึกข้อมูลสำเร็จ', type: 'success', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
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
  }
}
