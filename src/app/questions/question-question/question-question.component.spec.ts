import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionQuestionComponent } from './question-question.component';

describe('QuestionQuestionComponent', () => {
  let component: QuestionQuestionComponent;
  let fixture: ComponentFixture<QuestionQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
