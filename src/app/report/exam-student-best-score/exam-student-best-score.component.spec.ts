import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamStudentBestScoreComponent } from './exam-student-best-score.component';

describe('ExamStudentBestScoreComponent', () => {
  let component: ExamStudentBestScoreComponent;
  let fixture: ComponentFixture<ExamStudentBestScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamStudentBestScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamStudentBestScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
