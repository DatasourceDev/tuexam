import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamStudentGreatsComponent } from './exam-student-greats.component';

describe('ExamStudentGreatsComponent', () => {
  let component: ExamStudentGreatsComponent;
  let fixture: ComponentFixture<ExamStudentGreatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamStudentGreatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamStudentGreatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
