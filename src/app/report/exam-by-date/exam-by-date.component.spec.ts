import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamByDateComponent } from './exam-by-date.component';

describe('ExamByDateComponent', () => {
  let component: ExamByDateComponent;
  let fixture: ComponentFixture<ExamByDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamByDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
