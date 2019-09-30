import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamStudentComponent } from './exam-student.component';

describe('ExamStudentComponent', () => {
  let component: ExamStudentComponent;
  let fixture: ComponentFixture<ExamStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
