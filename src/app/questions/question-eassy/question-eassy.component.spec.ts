import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionEassyComponent } from './question-eassy.component';

describe('QuestionEassyComponent', () => {
  let component: QuestionEassyComponent;
  let fixture: ComponentFixture<QuestionEassyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionEassyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionEassyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
