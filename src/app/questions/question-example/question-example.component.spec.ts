import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionExampleComponent } from './question-example.component';

describe('QuestionExampleComponent', () => {
  let component: QuestionExampleComponent;
  let fixture: ComponentFixture<QuestionExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
