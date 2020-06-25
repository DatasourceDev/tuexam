import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamStudentGreatsBestScoreComponent } from './exam-student-greats-best-score.component';

describe('ExamStudentGreatsBestScoreComponent', () => {
  let component: ExamStudentGreatsBestScoreComponent;
  let fixture: ComponentFixture<ExamStudentGreatsBestScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamStudentGreatsBestScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamStudentGreatsBestScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
