import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamRegisterSearchComponent } from './exam-register-search.component';

describe('ExamRegisterSearchComponent', () => {
  let component: ExamRegisterSearchComponent;
  let fixture: ComponentFixture<ExamRegisterSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamRegisterSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamRegisterSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
