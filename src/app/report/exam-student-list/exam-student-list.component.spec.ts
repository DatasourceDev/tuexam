import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamStudentListComponent } from './exam-student-list.component';

describe('ExamStudentListComponent', () => {
  let component: ExamStudentListComponent;
  let fixture: ComponentFixture<ExamStudentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamStudentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamStudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
