import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-question-multi-choice',
  templateUrl: './question-multi-choice.component.html',
  styleUrls: ['./question-multi-choice.component.css']
})
export class QuestionMultiChoiceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  EditChoiceOnclick() {
    //$('#modal-6').modal('show', { backdrop: 'static' });
  }
}
