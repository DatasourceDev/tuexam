import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionViewChildComponent } from './question-view-child.component';

describe('QuestionViewChildComponent', () => {
  let component: QuestionViewChildComponent;
  let fixture: ComponentFixture<QuestionViewChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionViewChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionViewChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
