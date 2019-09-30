import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAnalyzeComponent } from './question-analyze.component';

describe('QuestionAnalyzeComponent', () => {
  let component: QuestionAnalyzeComponent;
  let fixture: ComponentFixture<QuestionAnalyzeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionAnalyzeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionAnalyzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
