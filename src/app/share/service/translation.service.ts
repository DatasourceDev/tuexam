import { Injectable } from '@angular/core';
//import { environment } from '../../environments/environment';
import { TranslationTable, Dictionary } from '../../i18n/translation-table';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguage: string;
  private translationTable: Dictionary;
  private subject: Subject<any>;
  constructor() {
    this.subject = new Subject<void>();
    this.translationTable = TranslationTable;
    this.setLanguage("th");
  }
  setLanguage(lang: string) {
    if (this.currentLanguage !== lang) {
      this.currentLanguage = lang;
      this.subject.next();
    }
  }
  getLanguage(): string {
    return this.currentLanguage;
  }
  setTranslationTable(table: Dictionary) {
    this.translationTable = table;
  }
  translate(key: string): string {
    if (!this.translationTable.hasOwnProperty(this.currentLanguage)
      || !this.translationTable[this.currentLanguage].hasOwnProperty(key)) {
      return key;
    }
    return this.translationTable[this.currentLanguage][key];
  }
  translationChanged(): Observable<void> {
    return this.subject.asObservable();
  }
}
