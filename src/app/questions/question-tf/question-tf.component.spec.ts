import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTfComponent } from './question-tf.component';

describe('QuestionTfComponent', () => {
  let component: QuestionTfComponent;
  let fixture: ComponentFixture<QuestionTfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionTfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionTfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
