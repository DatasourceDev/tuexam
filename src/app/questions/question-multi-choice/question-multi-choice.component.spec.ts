import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionMultiChoiceComponent } from './question-multi-choice.component';

describe('QuestionMultiChoiceComponent', () => {
  let component: QuestionMultiChoiceComponent;
  let fixture: ComponentFixture<QuestionMultiChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionMultiChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionMultiChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
