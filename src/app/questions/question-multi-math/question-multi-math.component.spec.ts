import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionMultiMathComponent } from './question-multi-math.component';

describe('QuestionMultiMathComponent', () => {
  let component: QuestionMultiMathComponent;
  let fixture: ComponentFixture<QuestionMultiMathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionMultiMathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionMultiMathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
