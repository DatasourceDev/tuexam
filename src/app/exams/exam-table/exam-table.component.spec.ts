import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamTableComponent } from './exam-table.component';

describe('ExamTableComponent', () => {
  let component: ExamTableComponent;
  let fixture: ComponentFixture<ExamTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
