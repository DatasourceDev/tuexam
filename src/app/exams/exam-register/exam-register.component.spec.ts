import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamRegisterComponent } from './exam-register.component';

describe('ExamRegisterComponent', () => {
  let component: ExamRegisterComponent;
  let fixture: ComponentFixture<ExamRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
