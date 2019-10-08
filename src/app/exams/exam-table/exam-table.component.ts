import { Component, OnInit } from '@angular/core';
declare var setup_calendar: any;
declare var $: any;

@Component({
  selector: 'app-exam-table',
  templateUrl: './exam-table.component.html',
  styleUrls: ['./exam-table.component.css']
})
export class ExamTableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setup_calendar();
  }
 
}
