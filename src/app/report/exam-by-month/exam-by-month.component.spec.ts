import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamByMonthComponent } from './exam-by-month.component';

describe('ExamByMonthComponent', () => {
  let component: ExamByMonthComponent;
  let fixture: ComponentFixture<ExamByMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamByMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
