import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exam-move',
  templateUrl: './exam-move.component.html',
  styleUrls: ['./exam-move.component.css']
})
export class ExamMoveComponent implements OnInit {
  public loading = false;
  private data: any;
  pageno: number = 1;
  pagelen: number = 0;
  id: string;
  examid: string;
  studentid: string;

  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.OnSearchRegister();
    
  }
  CheckExamStatus() {
    let formdata = { examid: this.examid, studentid: this.studentid };

    this.service.httpClientGet("api/TestResult/testresultstudentisexsit", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          this.router.navigate(['/exam-register-search/' + this.examid]);
        }
        else {
          if (result["result"] == 200) {
            Swal.fire({ text: 'ไม่สามารถย้ายรอบสอบได้เนื่องจากผู้เข้าสอบเริ่มต้นการสอบเรียบร้อยแล้ว', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.router.navigate(['/exam-register-search/' + this.examid]);
          }
          else {
            this.OnSearch();
          }
        }
      }, error => {
          Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
      });
  }
  OnSearchRegister() {
    let formdata = { id: this.id };
    this.loading = true;

    this.service.httpClientGet("api/Exam/getregistered", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          this.router.navigate(['/exam-register-search/' + this.examid]);
          this.loading = false;
        }
        else {
          if (result["result"] == 200) {
            this.data = result;
            this.examid = this.data.examid;
            this.studentid = this.data.studentid;
            this.CheckExamStatus();
          }
          else {
            Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.router.navigate(['/exam-register-search/' + this.examid]);
          }
          this.loading = false;
        }
      }, error => {
          Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          this.loading = false;                            
      });
  }
  OnSearch() {
    let formdata = { pageno: this.pageno, move_from: this.examid };

    this.loading = true;

    this.service.httpClientGet("api/Exam/listexam", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.data = null;
          this.pagelen = 0;
        }
        else {
          this.data = result["data"];
          this.pagelen = result["pagelen"];
        }
        this.loading = false;
      }, error => {
          Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          this.loading = false;                            
      });
  }

  OnChoose(id) {
    let formdata = { new_exam: id, id: this.id };

    this.service.httpClientGet("api/Exam/registermove", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          Swal.fire({ text: 'ข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          this.router.navigate(['/exam-register-search/' + this.examid]);
        }
        else {
          if (result["result"] == 200) {
            Swal.fire({ text: 'ย้ายรอบสำเร็จ', type: 'success', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
            this.router.navigate(['/exam-register-search/' + this.examid]);
          }
          else {
            Swal.fire({ text: result["message"], type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });

          }
        }
      }, error => {
          Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
      });
  }
}
