import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmSubAnswerComponent } from './mm-sub-answer.component';

describe('MmSubAnswerComponent', () => {
  let component: MmSubAnswerComponent;
  let fixture: ComponentFixture<MmSubAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MmSubAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmSubAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
