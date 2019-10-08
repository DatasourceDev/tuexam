import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-examination-send-type',
  templateUrl: './examination-send-type.component.html',
  styleUrls: ['./examination-send-type.component.css']
})
export class ExaminationSendTypeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.ChooseOnchange('email');
  }
  ChooseOnchange(value) {
    if (value == 'email') {
      $('#divemail').show();
      $('#divpost').hide();
    }
    else if (value == 'post') {
      $('#divemail').hide();
      $('#divpost').show();
    }
    else {
      $('#divemail').hide();
      $('#divpost').hide();
    }
  }
}
