import { Component, OnInit } from '@angular/core';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../share/service/session.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-examination-end',
  templateUrl: './examination-end.component.html',
  styleUrls: ['./examination-end.component.css']
})
export class ExaminationEndComponent implements OnInit {
  public useraccesdata: any;
  id: string;
  public loading = false;

  group: string;
  subject: string;
  questioncnt: number;
  answeredcnt: number;
  correctcnt: number;
  wrongcnt: number;
  point: number;
  
  starton: string;
  endon: string;
  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute, public session: SessionService) {
    let useracces = this.session.getData();
    this.useraccesdata = JSON.parse(useracces);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    let formdata = {
      id: this.id
    };
    this.loading = true;
    this.service.httpClientGet("api/TestResult/gettestresultstudent", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          Swal.fire({ text: 'บันทึกข้อมูลผิดพลาด', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        }
        else {
          if (result["result"] == 200) {
            this.group = result["group"];
            this.subject = result["subject"];
            this.questioncnt = result["questioncnt"];
            this.answeredcnt = result["answeredcnt"];
            this.starton = result["starton"];
            this.endon = result["endon"];
            this.correctcnt = result["correctcnt"];
            this.wrongcnt = result["wrongcnt"];
            this.point = result["point"];
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
  OnLogout() {
    this.session.logOut();
    this.router.navigate(["/login-student"]);
    return false;
  }
}
