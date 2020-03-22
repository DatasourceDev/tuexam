import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from "../../share/service/app.service";
import { HttpClient } from '@angular/common/http';
import { AppData } from "../../share/data/app.data";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-question-question',
  templateUrl: './question-question.component.html',
  styleUrls: ['./question-question.component.css']
})
export class QuestionQuestionComponent implements OnInit {
  pid: string;

  constructor(private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.pid = this.route.snapshot.params['pid'];

  }
  OnMCAdd() {
    this.router.navigate(['/question-multi-choice/', 0, this.pid]);
    return false;
  }
  OnAttAdd() {
    this.router.navigate(['/question-attitude/', 0, this.pid]);
    return false;
  }
  OnTFAdd() {
    this.router.navigate(['/question-tf/', 0, this.pid]);
    return false;
  }
  OnMMAdd() {
    this.router.navigate(['/question-multi-math/', 0, this.pid]);
    return false;
  }
  OnSAAdd() {
    this.router.navigate(['/question-short-ans/', 0, this.pid]);
    return false;
  }
  OnESAdd() {
    this.router.navigate(['/question-eassy/', 0, this.pid]);
    return false;
  }
  OnASAdd() {
    this.router.navigate(['/question-assigment/', 0, this.pid]);
    return false;
  }
}
