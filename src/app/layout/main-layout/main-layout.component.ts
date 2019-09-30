import { Component, OnInit } from '@angular/core';

declare var setup_horizontal_menu: any;
declare var setup_date_picker: any;
declare var setup_select2: any;
declare var cbr_replace: any;
declare var select2: any;
declare var $: any;

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setup_horizontal_menu();
    setup_date_picker();
    setup_select2();
    cbr_replace();
  }

}
