import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmSubQuestionComponent } from './mm-sub-question.component';

describe('MmSubQuestionComponent', () => {
  let component: MmSubQuestionComponent;
  let fixture: ComponentFixture<MmSubQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MmSubQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmSubQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
