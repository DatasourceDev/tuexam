import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionReadTextMultiChoiceComponent } from './question-read-text-multi-choice.component';

describe('QuestionReadTextMultiChoiceComponent', () => {
  let component: QuestionReadTextMultiChoiceComponent;
  let fixture: ComponentFixture<QuestionReadTextMultiChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionReadTextMultiChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionReadTextMultiChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
