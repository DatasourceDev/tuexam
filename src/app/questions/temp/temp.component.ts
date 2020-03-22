import { Component, OnInit } from '@angular/core';
import { AppService } from "../../share/service/app.service";
import { SessionService } from '../../share/service/session.service';
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.css']
})
export class TempComponent implements OnInit {
  public loading = false;
  inputForm: FormGroup;
  public useraccesdata: any;

  constructor(public session: SessionService,private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router) {
    let fileupload = new FormControl();
    let update_by = new FormControl();

    this.inputForm = new FormGroup({
      fileupload: fileupload,
      update_by: update_by,
    });

    let useracces = this.session.getData();
    this.useraccesdata = JSON.parse(useracces);
  }

  ngOnInit() {
  }
  incomingfile(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.inputForm.get('fileupload').setValue({
          filename: file.name,
          filetype: file.type,
          value: (<string>reader.result).split(',')[1]
        })
      };
    }
  }
  OnUpload() {
    this.loading = true;
    this.inputForm.patchValue({ update_by: this.useraccesdata.username });

    let data = JSON.stringify(this.inputForm.value);

    this.service.httpClientFilePost("api/question/uploadgtemp", data)
      .subscribe(result => {
        this.loading = false;
      }, error => {
        Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });
  } 
}
