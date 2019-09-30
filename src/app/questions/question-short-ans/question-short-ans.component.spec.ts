import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionShortAnsComponent } from './question-short-ans.component';

describe('QuestionShortAnsComponent', () => {
  let component: QuestionShortAnsComponent;
  let fixture: ComponentFixture<QuestionShortAnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionShortAnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionShortAnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
