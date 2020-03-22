import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-question-level',
  templateUrl: './question-level.component.html',
  styleUrls: ['./question-level.component.css']
})
export class QuestionLevelComponent implements OnInit {
  public loading = false;
  private data: any;

  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.OnSearch();
  }
  OnSearch() {
    this.loading = true;

    this.service.httpClientGet("api/Report/questionlevel", null)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.data = null;
        }
        else {
         
          this.data = result["data"];
        }
        this.loading = false;
      }, error => {
        Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
        this.loading = false;
      });

  }
  OnExcel() {
    this.service.openurl("api/ExcelReport/questionlevel");
    return false;
  }
  OnPdf() {
    this.service.openurl("api/PdfReport/questionlevel");
    return false;
  }
}
