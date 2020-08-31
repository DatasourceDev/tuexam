import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamGreatsExcelComponent } from './exam-greats-excel.component';

describe('ExamGreatsExcelComponent', () => {
  let component: ExamGreatsExcelComponent;
  let fixture: ComponentFixture<ExamGreatsExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamGreatsExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamGreatsExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
