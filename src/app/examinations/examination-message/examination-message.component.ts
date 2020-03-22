import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/share/service/translation.service';

@Component({
  selector: 'app-examination-message',
  templateUrl: './examination-message.component.html',
  styleUrls: ['./examination-message.component.css']
})
export class ExaminationMessageComponent implements OnInit {

  constructor(private translator: TranslationService) { }

  ngOnInit() {
  }
  translate(key: string): string {
    return this.translator.translate(key);
  }

  OnEn() {
    this.translator.setLanguage('en');
    return false;
  }
  OnTh() {
    this.translator.setLanguage('th');
    return false;
  }
}
