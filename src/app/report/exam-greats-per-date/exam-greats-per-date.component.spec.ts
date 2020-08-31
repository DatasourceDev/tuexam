import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamGreatsPerDateComponent } from './exam-greats-per-date.component';

describe('ExamGreatsPerDateComponent', () => {
  let component: ExamGreatsPerDateComponent;
  let fixture: ComponentFixture<ExamGreatsPerDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamGreatsPerDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamGreatsPerDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
