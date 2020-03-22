import { Component, OnInit } from '@angular/core';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from "@angular/forms";
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-subjectgroup-search',
  templateUrl: './subjectgroup-search.component.html',
  styleUrls: ['./subjectgroup-search.component.css']
})
export class SubjectgroupSearchComponent implements OnInit {
  public loading = false;
  private data: any;
  private statuslist: any;

  SearchFrom: FormGroup;

  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router) {
    let text_search = new FormControl('', Validators.maxLength(1000));
    let status_search = new FormControl('');

    this.SearchFrom = new FormGroup({
      text_search: text_search,
      status_search: status_search,
    });
  }
  
  ngOnInit() {            
    this.OnSearch(null);
    this.statuslist = this.appdata.getstatus();
  }
  OnSearch(formdata) {
    this.loading = true;

    this.service.httpClientGet("api/SubjectGroup/listgroup", formdata)
      .subscribe(result => {
        if (result == null || Object.keys(result).length == 0 || (Array.isArray(result) && result.length == 0)) {
          this.data = null;
        }
        else {
          this.data = result;
        }
        this.loading = false;

      }, error => {
          Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          this.loading = false;

      });
  }
  OnSubmit() {
    let formdata = { text_search: this.SearchFrom.value.text_search, status_search: this.SearchFrom.value.status_search};
    this.OnSearch(formdata);
  }
  OnEdit(id) {
    this.router.navigate(['/subjectgroup/', id]);
  }
  OnDelete(id) {
    Swal.fire({ text: 'คุณต้องการที่จะลบรายการนี้', type: 'warning', showCancelButton: true, cancelButtonText: 'ยกเลิก', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-blue', cancelButton: 'btn btn-white' } }).then((result) => {
      if (result.value == true) {
        let deldata = { id: id };
        this.service.httpClientGet("api/SubjectGroup/delete", deldata)
          .subscribe(result => {
            if (result["result"] == 200)
              this.OnSubmit();
            else
              Swal.fire({ text: result["message"], type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          }, error => {
            Swal.fire({ text: 'เกิดข้อผิดพลาดในระบบ', type: 'error', confirmButtonText: 'ตกลง', buttonsStyling: false, customClass: { confirmButton: 'btn btn-danger' } });
          });
      }
    });
   
  }

}
