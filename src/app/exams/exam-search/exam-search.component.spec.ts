import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamSearchComponent } from './exam-search.component';

describe('ExamSearchComponent', () => {
  let component: ExamSearchComponent;
  let fixture: ComponentFixture<ExamSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
