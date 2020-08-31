import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamGreatsPerStudentComponent } from './exam-greats-per-student.component';

describe('ExamGreatsPerStudentComponent', () => {
  let component: ExamGreatsPerStudentComponent;
  let fixture: ComponentFixture<ExamGreatsPerStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamGreatsPerStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamGreatsPerStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
