import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamStudentAllComponent } from './exam-student-all.component';

describe('ExamStudentAllComponent', () => {
  let component: ExamStudentAllComponent;
  let fixture: ComponentFixture<ExamStudentAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamStudentAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamStudentAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
