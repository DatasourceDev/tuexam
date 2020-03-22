import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-login-staff-history',
  templateUrl: './login-staff-history.component.html',
  styleUrls: ['./login-staff-history.component.css']
})
export class LoginStaffHistoryComponent implements OnInit {
  public loading = false;
  private data: any;
  id: string;

  pageno: number = 1;
  pagelen: number = 0;

  SearchFrom: FormGroup;
  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute) {
    let from_search = new FormControl('');
    let to_search = new FormControl('');

    this.SearchFrom = new FormGroup({
      from_search: from_search,
      to_search: to_search,
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    let formdata = { pageno: this.pageno, staff_search : this.id };
    this.OnSearch(formdata);
  }
  OnSearch(formdata) {
    this.loading = true;

    this.service.httpClientGet("api/Staff/listlog", formdata)
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

  OnSubmit() {
    var from_search = $('#from_search').val();
    var to_search = $('#to_search').val();
    this.SearchFrom.patchValue({ from_search: from_search });
    this.SearchFrom.patchValue({ to_search: to_search });

    let formdata = {
      from_search: this.SearchFrom.value.from_search,
      to_search: this.SearchFrom.value.to_search,
      pageno: this.pageno,
    };
    this.OnSearch(formdata);
  }
  OnPageChange(no) {
    if (no < 1)
      no = 1;
    if (no > this.pagelen)
      no = this.pagelen;

    this.pageno = no;
    this.OnSubmit();
    return false;
  }

  getPaginationArray() {
    var arr = [];
    for (var i = 1; i <= this.pagelen; i++) {
      arr.push(i);
    }
    return arr;
  }
}
