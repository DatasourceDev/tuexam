import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAttitudeComponent } from './question-attitude.component';

describe('QuestionAttitudeComponent', () => {
  let component: QuestionAttitudeComponent;
  let fixture: ComponentFixture<QuestionAttitudeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionAttitudeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionAttitudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
