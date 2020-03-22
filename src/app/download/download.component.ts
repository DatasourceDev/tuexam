import { Component, OnInit } from '@angular/core';
import { AppService } from "../share/service/app.service";
import { SessionService } from '../share/service/session.service';
import { HttpClient } from '@angular/common/http';
import { AppData } from "../share/data/app.data";
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  constructor(public session: SessionService, private service: AppService, private http: HttpClient, private appdata: AppData, private router: Router) {
  }

  ngOnInit() {
  }

  OnDownloadVideo() {
    this.service.openurl("uat/video.mp4");
    return false;
  }
  OnDownloadAudio() {
    this.service.openurl("uat/audio2.mp3");
    return false;
  }
  OnDownloadQuestion01() {
    this.service.openurl("uat/TU01/exampleTU01.docx");
    return false;
  }
  OnDownloadQuestion02() {
    this.service.openurl("uat/TU02/exampleTU02.docx");
    return false;
  }
  OnDownloadQuestion03() {
    this.service.openurl("uat/TU03/exampleTU03.docx");
    return false;
  }
  OnDownloadQuestion04() {
    this.service.openurl("uat/TU04/exampleTU04.docx");
    return false;
  }
  OnDownloadQuestion05() {
    this.service.openurl("uat/TU05/exampleTU05.docx");
    return false;
  }
  OnDownloadQuestion06() {
    this.service.openurl("uat/TU06/exampleTU06.docx");
    return false;
  }
  OnDownloadRegister() {
    this.service.openurl("uat/register.xlsx");
    return false;
  }
  OnDownloadStudent01() {
    this.service.openurl("uat/TU01/StudentDataTU01.xlsx");
    return false;
  }
  OnDownloadStudent02() {
    this.service.openurl("uat/TU02/StudentDataTU02.xlsx");
    return false;
  }
  OnDownloadStudent03() {
    this.service.openurl("uat/TU03/StudentDataTU03.xlsx");
    return false;
  }
  OnDownloadStudent04() {
    this.service.openurl("uat/TU04/StudentDataTU04.xlsx");
    return false;
  }
  OnDownloadStudent05() {
    this.service.openurl("uat/TU05/StudentDataTU05.xlsx");
    return false;
  }
  OnDownloadStudent06() {
    this.service.openurl("uat/TU06/StudentDataTU06.xlsx");
    return false;
  }

}
