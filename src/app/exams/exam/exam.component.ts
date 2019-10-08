import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.ChooseOnchange('random');
  }
  ChooseOnchange(value) {
    if (value == 'random') {
      $('#divcustom').hide();
      $('#divrandom').show();
    }
    else {
      $('#divrandom').hide();
      $('#divcustom').show();
    }
  }
}
