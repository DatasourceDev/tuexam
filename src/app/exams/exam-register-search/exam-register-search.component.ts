import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-exam-register-search',
  templateUrl: './exam-register-search.component.html',
  styleUrls: ['./exam-register-search.component.css']
})
export class ExamRegisterSearchComponent implements OnInit {

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
