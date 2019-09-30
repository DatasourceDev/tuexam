import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAssigmentComponent } from './question-assigment.component';

describe('QuestionAssigmentComponent', () => {
  let component: QuestionAssigmentComponent;
  let fixture: ComponentFixture<QuestionAssigmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionAssigmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionAssigmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
