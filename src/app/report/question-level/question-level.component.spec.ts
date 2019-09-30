import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionLevelComponent } from './question-level.component';

describe('QuestionLevelComponent', () => {
  let component: QuestionLevelComponent;
  let fixture: ComponentFixture<QuestionLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
