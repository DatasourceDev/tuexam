import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

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
