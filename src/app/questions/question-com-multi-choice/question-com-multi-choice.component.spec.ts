import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionComMultiChoiceComponent } from './question-com-multi-choice.component';

describe('QuestionComMultiChoiceComponent', () => {
  let component: QuestionComMultiChoiceComponent;
  let fixture: ComponentFixture<QuestionComMultiChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionComMultiChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComMultiChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
