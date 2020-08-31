import { Component, OnInit } from '@angular/core';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
declare var $: any;
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-exam-greats-excel',
  templateUrl: './exam-greats-excel.component.html',
  styleUrls: ['./exam-greats-excel.component.css']
})
export class ExamGreatsExcelComponent implements OnInit {
  public loading = false;
  private data: any;
  private subject: any;
  private grouplist: any;
  subjectcnt: number;
  pageno: number = 1;
  pagelen: number = 0;

  SearchFrom: FormGroup;
  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router) {
    let from_search = new FormControl('', Validators.required);
    let to_search = new FormControl('', Validators.required);

    this.SearchFrom = new FormGroup({
      from_search: from_search,
      to_search: to_search,
    });
  }


  ngOnInit() {
    this.SetDate();
  }
  SetDate() {
    var currentDate = formatDate(new Date(), 'dd/MM/yyyy', 'en');
    var firstdate = currentDate;
    var month = (new Date()).getMonth() + 1;
    var year = (new Date()).getFullYear();
    if (month < 10)
      firstdate = "01/" + "0" + month + "/" + year;
    else
      firstdate = "01/" + month + "/" + year;

    $('#from_search').val(firstdate);
    $('#to_search').val(currentDate);
    this.SearchFrom.patchValue({ from_search: firstdate });
    this.SearchFrom.patchValue({ to_search: currentDate });

  }
 
  OnSubmit() {
    var from_search = $('#from_search').val();
    var to_search = $('#to_search').val();
    this.SearchFrom.patchValue({ from_search: from_search });
    this.SearchFrom.patchValue({ to_search: to_search });

    this.SearchFrom.controls['from_search'].markAsTouched();
    this.SearchFrom.controls['to_search'].markAsTouched();

    if (this.SearchFrom.valid) {
      this.service.openurl("api/ExcelReport/examgreatsexcel?from_search=" + this.SearchFrom.value.from_search + "&to_search=" + this.SearchFrom.value.to_search);
    }
  }

}

