import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-exam-register',
  templateUrl: './exam-register.component.html',
  styleUrls: ['./exam-register.component.css']
})
export class ExamRegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.ChooseOnchange('advance');
  }
  ChooseOnchange(value) {
    if (value == 'advance') {
      $('#divwalkin').hide();
      $('#divadvance').show();
    }
    else {
      $('#divadvance').hide();
      $('#divwalkin').show();
    }
  }
}
