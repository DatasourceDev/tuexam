import { Component, OnInit } from '@angular/core';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';

declare var $: any;
declare var setup_calendar: any;

@Component({
  selector: 'app-exam-table',
  templateUrl: './exam-table.component.html',
  styleUrls: ['./exam-table.component.css']
})
export class ExamTableComponent implements OnInit {
  public loading = false;
  private data: any;
  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router) {

  }

  ngOnInit() {
    this.OnSearch();
  }

  OnSearch() {
    var currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

    this.loading = true;
    this.service.httpClientGet("api/Exam/listcalendarexam", null)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.data = null;
        }
        else {
          this.data = result;
          var events = [];
          for (var i = 0; i < this.data.length; i++) {
            var data = this.data[i];
            if (Number(data.registeredcnt) > 0) {
              var e1 = {
                id: data.id,
                title: (Number(data.examperiod) + 1) + '. ' + data.group + ' ' + data.examperiodName + ' ' + data.registeredcnt + ' คน',
                start: data.date,
                color: data.color
              };
              events.push(e1);
            }
          }
          setup_calendar(events, currentDate);
        }
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }
}
